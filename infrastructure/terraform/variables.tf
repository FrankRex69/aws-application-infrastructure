variable "voting-vpc-id" {
  description = "Voting VPC ID"
  type        = string
}

variable "ecs-voting-fargate-cluster-name" {
  description = "Name for Voting ECS Fargate Cluster"
  type        = string
}

variable "voting-subnet-public1-eu-west-1a-id" {
  description = "ID of voting public subnet in eu west 1a"
  type        = string
}

variable "camel_endpoint" {
  type = string
}

variable "dry_run_invoke_camel" {
  type = bool
}

variable "email_source_votingxml" {
  type = string
}

variable "email_destination_votingxml" {
  type = string
}