locals {
  cluster_name    = "ez-deploy"
  cluster_version = "1.31"
  env             = "dev"
  vpc_cidr        = "10.0.0.0/16"
  azs             = slice(data.aws_availability_zones.available.names, 0, 3)

}

data "aws_availability_zones" "available" {
  # Do not include local zones
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}
