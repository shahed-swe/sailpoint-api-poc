# Import necessary modules
function Get-AllUsers {
    param (
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl
    )

    $apiUrl = "$BaseUrl/users/usersentitlements"
    try {
        Write-Host "Calling Get-AllUsers API: $apiUrl"
        $response = Invoke-RestMethod -Uri $apiUrl -Method GET
        return $response
    } catch {
        Write-Error "Failed to fetch all users with entitlements: $_"
        throw $_
    }
}

function Get-UserEntitlements {
    param (
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl,
        [Parameter(Mandatory = $true)]
        [string]$Username
    )

    $apiUrl = "$BaseUrl/users/$Username/entitlements"
    try {
        Write-Host "Calling Get-UserEntitlements API: $apiUrl"
        $response = Invoke-RestMethod -Uri $apiUrl -Method GET
        return $response
    } catch {
        Write-Error "Failed to fetch entitlements for user ${Username}: $_"
        throw $_
    }
}

function Create-User {
    param (
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl,
        [Parameter(Mandatory = $true)]
        [hashtable]$UserDetails
    )

    $apiUrl = "$BaseUrl/users"
    try {
        Write-Host "Calling Create-User API: $apiUrl"
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body ($UserDetails | ConvertTo-Json -Depth 2) -ContentType "application/json"
        return $response
    } catch {
        Write-Error "Failed to create user: $_"
        throw $_
    }
}

function Update-User {
    param (
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl,
        [Parameter(Mandatory = $true)]
        [string]$Username,
        [Parameter(Mandatory = $true)]
        [hashtable]$UserDetails
    )

    $apiUrl = "$BaseUrl/users/$Username"
    try {
        Write-Host "Calling Update-User API: $apiUrl"
        $response = Invoke-RestMethod -Uri $apiUrl -Method PUT -Body ($UserDetails | ConvertTo-Json -Depth 2) -ContentType "application/json"
        return $response
    } catch {
        Write-Error "Failed to update user ${Username}: $_"
        throw $_
    }
}

function Assign-Roles {
    param (
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl,
        [Parameter(Mandatory = $true)]
        [string]$Username,
        [Parameter(Mandatory = $true)]
        [array]$Entitlements
    )

    $apiUrl = "$BaseUrl/users/assignroles"
    $payload = @{
        username     = $Username
        entitlements = $Entitlements
    }

    try {
        Write-Host "Calling Assign-Roles API: $apiUrl"
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body ($payload | ConvertTo-Json -Depth 2) -ContentType "application/json"
        return $response
    } catch {
        Write-Error "Failed to assign roles to ${Username}: $_"
        throw $_
    }
}

# function Remove-Roles {
#     param (
#         [Parameter(Mandatory = $true)]
#         [string]$BaseUrl,
#         [Parameter(Mandatory = $true)]
#         [string]$Username,
#         [Parameter(Mandatory = $true)]
#         [array]$Entitlements
#     )

#     $apiUrl = "$BaseUrl/users/removeroles"
#     $payload = @{
#         username     = $Username
#         entitlements = $Entitlements
#     }

#     try {
#         Write-Host "Calling Remove-Roles API: $apiUrl"
#         $response = Invoke-RestMethod -Uri $apiUrl -Method DELETE -Body ($payload | ConvertTo-Json -Depth 2) -ContentType "application/json"
#         return $response
#     } catch {
#         Write-Error "Failed to remove roles from ${Username}: $_"
#         throw $_
#     }
# }

# Debugging or standalone testing
if ($MyInvocation.InvocationName -eq ".\import.ps1") {
    Write-Host "Running UserEntitlements.ps1 in standalone mode."

    # Example API Base URL
    $BaseUrl = "http://localhost:3000"

    # Test: Fetch All Users with Entitlements
    Write-Host "Fetching all users with entitlements..."
    $users = Get-AllUsers -BaseUrl $BaseUrl
    Write-Output $users

    # Test: Create a New User
    $newUser = @{
        username = "johndoe1"
    }
    Write-Host "Creating a new user..."
    $createdUser = Create-User -BaseUrl $BaseUrl -UserDetails $newUser
    Write-Output $createdUser

    # Test: Assign Roles
    $rolesToAssign = @("P-admin-AB1", "P-admin-AB2")
    Write-Host "Assigning roles to johndoe..."
    $assignResponse = Assign-Roles -BaseUrl $BaseUrl -Username "johndoe" -Entitlements $rolesToAssign
    Write-Output $assignResponse

    # Test: Remove Roles
    # Write-Host "Removing roles from johndoe..."
    # $removeResponse = Remove-Roles -BaseUrl $BaseUrl -Username "johndoe" -Entitlements $rolesToAssign
    # Write-Output $removeResponse
}
