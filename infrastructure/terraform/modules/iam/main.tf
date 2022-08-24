terraform {
  required_version = ">= 1.1.7"
}

resource "aws_security_group" "allow-port-80" {
  name        = "allow-port-80"
  description = "Allow Traffic on 80 port"
  vpc_id      = var.voting-vpc-id

  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow-port-80"
  }
}

resource "aws_security_group" "allow-port-587" {
  name        = "allow-port-587"
  description = "Allow Traffic on 587 port"
  vpc_id      = var.voting-vpc-id

  ingress {
    from_port        = 587
    to_port          = 587
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow-port-587"
  }
}

resource "aws_security_group" "allow-port-0" {
  name        = "allow-port-0"
  description = "Allow Traffic on 0 port"
  vpc_id      = var.voting-vpc-id

  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow-port-587"
  }
}