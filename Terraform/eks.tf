module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 20.22"
  cluster_name    = local.cluster_name
  cluster_version = local.cluster_version

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = false
  vpc_id                          = module.vpc.vpc_id
  subnet_ids                      = module.vpc.private_subnets

  enable_cluster_creator_admin_permissions = true
  authentication_mode                      = "API"

  cluster_addons = {
    kube-proxy = {}
    vpc-cni    = {}
    coredns = {
      configuration_values = jsonencode({
        computeType = "fargate"
        resources = {
          limits = {
            cpu    = "0.25"
            memory = "256M"
          }
          requests = {
            cpu    = "0.25"
            memory = "256M"
          }
        }
      })
    }
  }
  fargate_profiles = {
    kube_system = {
      name = "kube-system"
      selectors = [
        {
          namespace = "kube-system"
          labels    = { k8s-app = "kube-dns" }
        },
        {
          namespace = "kube-system"
          labels    = { "app.kubernetes.io/name" = "karpenter" }
        }
      ]
    }
  }

  cluster_security_group_additional_rules = {
    ingress_self_all = {
      description = "Allow Atlantis and VPN to reach control plane"
      protocol    = "tcp"
      from_port   = 443
      to_port     = 443
      type        = "ingress"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  node_security_group_tags = {
    "karpenter.sh/discovery" = local.cluster_name
  }
}

