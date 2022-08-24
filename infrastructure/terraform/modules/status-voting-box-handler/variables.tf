variable "aws_output_status_voting_box_handler" {  
  default = "./output/status_voting_box_handler.zip"
}

variable "camel_endpoint" {}

variable "dry_run_invoke_camel" {
  type = bool
}

variable "email_source_votingxml" {
  type = string
}

variable "email_destination_votingxml" {
  type = string
}

variable "voting-subnet-public1-eu-west-1a-id" {}

variable "sg-allow-port-80-id" {}

variable "sg_allowed_sg" {}