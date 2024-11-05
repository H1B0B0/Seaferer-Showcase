module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = local.cluster_name
  cidr = local.vpc_cidr

  azs                  = local.azs
  private_subnets      = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k)]
  public_subnets       = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 4)]
  enable_dns_hostnames = true
  enable_dns_support   = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  public_subnet_tags = {
    "kubernetes.io/role/elb"                      = "1"
    "kubernetes.io/cluster/${local.cluster_name}" = null
  }

  private_subnet_tags = {
    "karpenter.sh/discovery"                      = local.cluster_name
    "kubernetes.io/cluster/${local.cluster_name}" = null
  }
}

resource "aws_security_group" "karpenter_node_sg" {
  name        = "${local.cluster_name}-karpenter-node-sg"
  description = "Security group for Karpenter nodes"
  vpc_id      = module.vpc.vpc_id

  tags = {
    "karpenter.sh/discovery" = local.cluster_name
  }
}

resource "aws_security_group_rule" "allow_ssh_access" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  security_group_id = aws_security_group.karpenter_node_sg.id
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow SSH access from anywhere"
}

resource "aws_security_group_rule" "allow_control_plane_to_node" {
  type                     = "ingress"
  from_port                = 1025
  to_port                  = 65535
  protocol                 = "tcp"
  security_group_id        = aws_security_group.karpenter_node_sg.id
  source_security_group_id = module.eks.cluster_security_group_id
  description              = "Allow incoming traffic from the EKS control plane"
}

resource "aws_security_group_rule" "allow_node_to_node_communication" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.karpenter_node_sg.id
  source_security_group_id = aws_security_group.karpenter_node_sg.id
  description              = "Allow node to node communication"
}

resource "aws_security_group_rule" "allow_all_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  security_group_id = aws_security_group.karpenter_node_sg.id
  cidr_blocks       = ["0.0.0.0/0"]

  description = "Allow all outbound traffic"
}
