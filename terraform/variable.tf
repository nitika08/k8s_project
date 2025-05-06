variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "k8s-app-rg"
}

variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "eastus"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
  default     = "k8sappacr"
}

variable "aks_cluster_name" {
  description = "Name of the AKS cluster"
  type        = string
  default     = "k8s-app-aks"
}

variable "aks_dns_prefix" {
  description = "DNS prefix for AKS cluster"
  type        = string
  default     = "k8sapp"
}

/*variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.29.2"
}*/

variable "node_count" {
  description = "Initial number of nodes in the AKS cluster"
  type        = number
  default     = 2
}

variable "min_node_count" {
  description = "Minimum number of nodes in the AKS cluster"
  type        = number
  default     = 1
}

variable "max_node_count" {
  description = "Maximum number of nodes in the AKS cluster"
  type        = number
  default     = 5
}

variable "node_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_D2_v2"
}


