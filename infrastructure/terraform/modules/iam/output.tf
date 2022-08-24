output "allow-port-80-sg-id" {
  value = aws_security_group.allow-port-80.id
}

output "allow-port-587-sg-id" {
  value = aws_security_group.allow-port-587.id
}

output "allow-port-0-sg-id" {
  value = aws_security_group.allow-port-0.id
}