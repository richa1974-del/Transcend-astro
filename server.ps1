# Transcend Consultant V3 - Complete API Server (PowerShell Edition)
# Serves static web pages and handles Lead CRM APIs, notes, search, CSV export, and thank-you email automation

Add-Type -AssemblyName System.Web

# --- 1. Load Environment Settings ---
$EnvValues = @{
    SMTP_HOST = "smtp.gmail.com"
    SMTP_PORT = 587
    SMTP_USER = "rich1974@gmail.com"
    SMTP_PASS = ""
    ADMIN_USER = "admin"
    ADMIN_PASS = "TranscendAdmin2026"
    PORT = 8000
}

$currentDirectory = Get-Location

if (Test-Path "$currentDirectory\.env") {
    Get-Content "$currentDirectory\.env" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
            $parts = $line -split '=', 2
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            $EnvValues[$key] = $value
        }
    }
}

$port = [int]$EnvValues.PORT
$leadsFile = Join-Path $currentDirectory "leads.json"

# Initialize leads database file
if (-not (Test-Path $leadsFile)) {
    @() | ConvertTo-Json | Out-File $leadsFile -Encoding utf8
}

# --- 2. Database Helper Functions ---
function Get-Leads {
    if (Test-Path $leadsFile) {
        $json = Get-Content $leadsFile -Raw -Encoding utf8
        if ([string]::IsNullOrWhiteSpace($json)) { return ,@() }
        $leads = $json | ConvertFrom-Json
        if ($null -eq $leads) { return ,@() }
        if ($leads.GetType().Name -ne "Object[]") { return ,@($leads) }
        return ,$leads
    }
    return ,@()
}

function Save-Leads($leads) {
    $leads | ConvertTo-Json -Depth 10 | Out-File $leadsFile -Encoding utf8
}

# --- 3. Email Helper Functions ---
function Get-EmailHtml($name) {
    $firstName = $name
    if ($name -and $name.Contains(" ")) {
        $firstName = $name.Split(' ')[0]
    }
    if (-not $firstName) { $firstName = "there" }
    $year = (Get-Date).Year
    
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Transcend Astro</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F4; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin:0; color:#C8A15A; font-size:28px; font-weight:300; letter-spacing:4px;">TRANSCEND</h1>
              <p style="margin:4px 0 0; color:#999; font-size:11px; letter-spacing:3px; text-transform:uppercase;">Astro Interior Consultant</p>
            </td>
          </tr>
          
          <!-- Gold Accent Line -->
          <tr>
            <td style="height:3px; background: linear-gradient(90deg, #C8A15A, #dfb975, #C8A15A);"></td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <p style="color:#C8A15A; font-size:14px; letter-spacing:2px; text-transform:uppercase; margin:0 0 16px;">* Thank You</p>
              
              <h2 style="color:#1E1E1E; font-size:24px; font-weight:400; margin:0 0 20px; line-height:1.4;">
                Dear $firstName,
              </h2>
              
              <p style="color:#555555; font-size:15px; line-height:1.8; margin:0 0 20px;">
                Thank you for reaching out to <strong>Transcend Consultant</strong>. We are delighted to receive your consultation request and truly appreciate your interest in aligning your living space with your cosmic blueprint.
              </p>
              
              <p style="color:#555555; font-size:15px; line-height:1.8; margin:0 0 20px;">
                Our team will review your details and <strong>connect with you within 24 hours</strong> to schedule your personalized Astro Interior consultation.
              </p>
              
              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #E8E3DB; margin:30px 0;">
              
              <!-- What to Expect -->
              <h3 style="color:#1E1E1E; font-size:18px; font-weight:500; margin:0 0 15px;">What Happens Next?</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">01.</span>
                    Our team reviews your consultation request
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">02.</span>
                    We reach out to schedule your discovery call
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">03.</span>
                    Your personalized astro-interior journey begins
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="https://www.transcendconsultant.com" style="display:inline-block; background:#C8A15A; color:#FFFFFF; text-decoration:none; padding:14px 36px; border-radius:8px; font-size:14px; font-weight:500; letter-spacing:1px;">VISIT OUR WEBSITE</a>
              </div>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="background-color:#F6F5F2; padding: 30px 40px; border-top: 1px solid #E8E3DB;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#555; font-size:13px; line-height:1.8;">
                    <strong style="color:#1E1E1E;">Richa Agarwal</strong><br>
                    Lead Astro-Interior Consultant and Founder<br><br>
                    Phone: <a href="tel:+917838048195" style="color:#C8A15A; text-decoration:none;">+91 78380 48195</a><br>
                    Email: <a href="mailto:rich1974@gmail.com" style="color:#C8A15A; text-decoration:none;">rich1974@gmail.com</a><br>
                    WhatsApp: <a href="https://wa.me/917838048195" style="color:#C8A15A; text-decoration:none;">Chat on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#2E2E2E; padding: 20px 40px; text-align:center;">
              <p style="color:#888; font-size:11px; margin:0; line-height:1.6;">
                © $year Transcend Consultant. All Rights Reserved.<br>
                1079, 4th Floor, Sector B, Pocket 1, Vasant Kunj, New Delhi - 110070
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"@
}

function Send-ThankYouEmail($leadName, $leadEmail) {
    if ([string]::IsNullOrWhiteSpace($EnvValues.SMTP_PASS)) {
        Write-Host "[Email] SMTP_PASS not configured. Skipping email for: $leadEmail"
        return
    }
    if ([string]::IsNullOrWhiteSpace($leadEmail)) {
        Write-Host "[Email] No email address provided. Skipping."
        return
    }

    try {
        $smtp = New-Object System.Net.Mail.SmtpClient($EnvValues.SMTP_HOST, [int]$EnvValues.SMTP_PORT)
        $smtp.EnableSsl = $true
        $smtp.Credentials = New-Object System.Net.NetworkCredential($EnvValues.SMTP_USER, $EnvValues.SMTP_PASS)
        
        $mail = New-Object System.Net.Mail.MailMessage
        $mail.From = New-Object System.Net.Mail.MailAddress($EnvValues.SMTP_USER, "Transcend Consultant")
        $mail.To.Add($leadEmail)
        $mail.Subject = "Thank You, $($leadName.Split(' ')[0])! - Transcend Astro Interior Consultation"
        
        $body = Get-EmailHtml -name $leadName
        $mail.Body = $body
        $mail.IsBodyHtml = $true
        
        $smtp.Send($mail)
        Write-Host "[Email] Thank you email successfully sent to $leadEmail"
    } catch {
        Write-Host "[Email] Failed to send email to $leadEmail. Error: $_"
    }
}

# --- 4. HTTP API Helper Functions ---
function Send-JsonResponse($response, $statusCode, $object) {
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    $json = $object | ConvertTo-Json -Depth 10
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.OutputStream.Close()
}

function Check-Auth($request) {
    $authHeader = $request.Headers.Get("Authorization")
    if (-not $authHeader) { return $false }
    if (-not $authHeader.StartsWith("Bearer ")) { return $false }
    $token = $authHeader.Substring(7)
    if ($token -eq "AdminSessionToken2026") { return $true }
    return $false
}

# --- 5. Start Listener ---
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
} catch {
    Write-Host "Failed to start listener. Port $port might be in use or requires admin."
    Exit
}
Write-Host "=========================================================="
Write-Host "Transcend Consultant Server started on http://localhost:$port/"
Write-Host "Admin Dashboard: http://localhost:$port/admin.html"
Write-Host "Leads Database: $leadsFile"
Write-Host "=========================================================="
Write-Host "Press Ctrl+C in this console to stop the server."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $method = $request.HttpMethod
        $urlPath = $request.Url.LocalPath

        # --- Handle OPTIONS Preflight Requests ---
        if ($method -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")
            $response.OutputStream.Close()
            continue
        }

        # --- API Routing ---
        if ($urlPath.StartsWith("/api/")) {
            
            # Read request body
            $body = ""
            if ($request.HasEntityBody) {
                $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                $body = $reader.ReadToEnd()
                $reader.Close()
            }
            
            $requestData = $null
            if ($body) {
                try {
                    $requestData = $body | ConvertFrom-Json
                } catch {}
            }

            # 1. Login Endpoint
            if ($urlPath -eq "/api/auth/login" -and $method -eq "POST") {
                if ($null -ne $requestData -and $requestData.username -eq $EnvValues.ADMIN_USER -and $requestData.password -eq $EnvValues.ADMIN_PASS) {
                    Send-JsonResponse $response 200 @{ token = "AdminSessionToken2026"; username = $EnvValues.ADMIN_USER }
                } else {
                    Send-JsonResponse $response 401 @{ error = "Invalid username or password" }
                }
                continue
            }

            # 2. Leads Submission Endpoint (General Contact Form)
            if ($urlPath -eq "/api/leads" -and $method -eq "POST") {
                if ($null -eq $requestData -or [string]::IsNullOrWhiteSpace($requestData.name)) {
                    Send-JsonResponse $response 400 @{ error = "Name is required" }
                    continue
                }

                $leads = Get-Leads
                $newId = 1
                if ($leads.Count -gt 0) {
                    $newId = ($leads | Measure-Object -Property id -Maximum).Maximum + 1
                }

                $newLead = [PSCustomObject]@{
                    id = $newId
                    name = $requestData.name
                    email = $requestData.email
                    phone = $requestData.phone
                    city = $requestData.city
                    property_type = $requestData.property_type
                    package = $requestData.package
                    preferred_date = $requestData.preferred_date
                    message = $requestData.message
                    source = "contact_form"
                    status = "New Lead"
                    priority = "Medium"
                    notes = ""
                    assigned_to = ""
                    created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                    updated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                    activities = @(
                        [PSCustomObject]@{
                            description = "New lead from contact form: $($requestData.name)"
                            created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                        }
                    )
                }

                $leads += $newLead
                Save-Leads $leads

                # Send email asynchronously (non-blocking)
                $null = [System.Threading.Tasks.Task]::Run([System.Action]{
                    Send-ThankYouEmail -leadName $requestData.name -leadEmail $requestData.email
                })

                Send-JsonResponse $response 201 @{ success = $true; id = $newId; message = "Lead created successfully" }
                continue
            }

            # 3. Leads Submission Endpoint (Onboarding Form)
            if ($urlPath -eq "/api/leads/onboarding" -and $method -eq "POST") {
                if ($null -eq $requestData -or [string]::IsNullOrWhiteSpace($requestData.name)) {
                    Send-JsonResponse $response 400 @{ error = "Name is required" }
                    continue
                }

                $leads = Get-Leads
                $newId = 1
                if ($leads.Count -gt 0) {
                    $newId = ($leads | Measure-Object -Property id -Maximum).Maximum + 1
                }

                $messageText = "DOB: $($requestData.dob), TOB: $($requestData.tob), POB: $($requestData.pob). Floors: $($requestData.floors). Status: $($requestData.home_status). Notes: $($requestData.notes)"

                $newLead = [PSCustomObject]@{
                    id = $newId
                    name = $requestData.name
                    email = $requestData.email
                    phone = $requestData.mobile
                    city = $requestData.city
                    property_type = $requestData.property_type
                    package = ""
                    preferred_date = ""
                    message = $messageText
                    source = "onboarding_form"
                    status = "New Lead"
                    priority = "Medium"
                    notes = ""
                    assigned_to = ""
                    created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                    updated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                    activities = @(
                        [PSCustomObject]@{
                            description = "New lead from onboarding questionnaire: $($requestData.name)"
                            created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                        }
                    )
                }

                $leads += $newLead
                Save-Leads $leads

                $null = [System.Threading.Tasks.Task]::Run([System.Action]{
                    Send-ThankYouEmail -leadName $requestData.name -leadEmail $requestData.email
                })

                Send-JsonResponse $response 201 @{ success = $true; id = $newId; message = "Onboarding lead created successfully" }
                continue
            }

            # 4. Get all leads (Protected)
            if ($urlPath -eq "/api/leads" -and $method -eq "GET") {
                if (-not (Check-Auth $request)) {
                    Send-JsonResponse $response 401 @{ error = "Unauthorized - Invalid token" }
                    continue
                }

                $leads = Get-Leads
                $query = $request.Url.Query
                if ($query -and $query.Contains("search=")) {
                    $searchPart = ($query -split "search=")[1]
                    $search = [System.Web.HttpUtility]::UrlDecode(($searchPart -split "&")[0]).ToLower()
                    if ($search) {
                        $leads = $leads | Where-Object {
                            ($_.name -and $_.name.ToLower().Contains($search)) -or 
                            ($_.email -and $_.email.ToLower().Contains($search)) -or 
                            ($_.phone -and $_.phone.ToLower().Contains($search)) -or 
                            ($_.city -and $_.city.ToLower().Contains($search)) -or 
                            ($_.status -and $_.status.ToLower().Contains($search)) -or 
                            ($_.notes -and $_.notes.ToLower().Contains($search))
                        }
                    }
                }

                Send-JsonResponse $response 200 $leads
                continue
            }

            # 5. Export Leads CSV Endpoint (Protected)
            if (($urlPath -eq "/api/leads/export/csv" -or $urlPath -eq "/api/leads/export") -and $method -eq "GET") {
                if (-not (Check-Auth $request)) {
                    Send-JsonResponse $response 401 @{ error = "Unauthorized - Invalid token" }
                    continue
                }

                $leads = Get-Leads
                $csv = "ID,Name,Email,Phone,City,Property Type,Package,Preferred Date,Source,Status,Priority,Notes,Created At`r`n"
                foreach ($lead in $leads) {
                    $escapedName = if ($lead.name) { $lead.name.Replace('"', '""') } else { "" }
                    $escapedEmail = if ($lead.email) { $lead.email.Replace('"', '""') } else { "" }
                    $escapedPhone = if ($lead.phone) { $lead.phone.Replace('"', '""') } else { "" }
                    $escapedCity = if ($lead.city) { $lead.city.Replace('"', '""') } else { "" }
                    $escapedProperty = if ($lead.property_type) { $lead.property_type.Replace('"', '""') } else { "" }
                    $escapedPackage = if ($lead.package) { $lead.package.Replace('"', '""') } else { "" }
                    $escapedPrefDate = if ($lead.preferred_date) { $lead.preferred_date.Replace('"', '""') } else { "" }
                    $escapedSource = if ($lead.source) { $lead.source.Replace('"', '""') } else { "" }
                    $escapedStatus = if ($lead.status) { $lead.status.Replace('"', '""') } else { "" }
                    $escapedPriority = if ($lead.priority) { $lead.priority.Replace('"', '""') } else { "" }
                    $escapedNotes = if ($lead.notes) { $lead.notes.Replace('"', '""') } else { "" }
                    $escapedCreatedAt = if ($lead.created_at) { $lead.created_at.Replace('"', '""') } else { "" }
                    
                    $csv += "$($lead.id),`"$escapedName`",`"$escapedEmail`",`"$escapedPhone`",`"$escapedCity`",`"$escapedProperty`",`"$escapedPackage`",`"$escapedPrefDate`",`"$escapedSource`",`"$escapedStatus`",`"$escapedPriority`",`"$escapedNotes`",`"$escapedCreatedAt`"`r`n"
                }

                $response.StatusCode = 200
                $response.ContentType = "text/csv; charset=utf-8"
                $response.Headers.Add("Content-Disposition", "attachment; filename=transcend_leads.csv")
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($csv)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Close()
                continue
            }

            # 6. Single Lead Operations: GET, PUT, DELETE (Protected)
            if ($urlPath -match "^/api/leads/(\d+)$") {
                $id = [int]$Matches[1]
                
                if (-not (Check-Auth $request)) {
                    Send-JsonResponse $response 401 @{ error = "Unauthorized - Invalid token" }
                    continue
                }

                $leads = Get-Leads
                $leadIdx = -1
                for ($i = 0; $i -lt $leads.Count; $i++) {
                    if ($leads[$i].id -eq $id) {
                        $leadIdx = $i
                        break
                    }
                }

                if ($leadIdx -eq -1) {
                    Send-JsonResponse $response 404 @{ error = "Lead not found" }
                    continue
                }

                # A. GET Lead details
                if ($method -eq "GET") {
                    Send-JsonResponse $response 200 $leads[$leadIdx]
                    continue
                }

                # B. DELETE Lead
                if ($method -eq "DELETE") {
                    $filteredLeads = $leads | Where-Object { $_.id -ne $id }
                    Save-Leads $filteredLeads
                    Send-JsonResponse $response 200 @{ success = $true; message = "Lead deleted" }
                    continue
                }

                # C. PUT Update Lead
                if ($method -eq "PUT") {
                    $lead = $leads[$leadIdx]
                    
                    if ($null -ne $requestData) {
                        # Change Status activity
                        if ($null -ne $requestData.status -and $requestData.status -ne $lead.status) {
                            $newAct = [PSCustomObject]@{
                                description = "Status changed from `"$($lead.status)`" to `"$($requestData.status)`""
                                created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                            }
                            if ($null -eq $lead.activities) { $lead.activities = @() }
                            if ($lead.activities.GetType().Name -ne "Object[]") { $lead.activities = @($lead.activities) }
                            $lead.activities = @($newAct) + $lead.activities
                            $lead.status = $requestData.status
                        }

                        # Priority Update
                        if ($null -ne $requestData.priority -and $requestData.priority -ne $lead.priority) {
                            $lead.priority = $requestData.priority
                        }

                        # Notes activity
                        if ($null -ne $requestData.notes -and $requestData.notes -ne $lead.notes) {
                            $newAct = [PSCustomObject]@{
                                description = "Notes updated"
                                created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                            }
                            if ($null -eq $lead.activities) { $lead.activities = @() }
                            if ($lead.activities.GetType().Name -ne "Object[]") { $lead.activities = @($lead.activities) }
                            $lead.activities = @($newAct) + $lead.activities
                            $lead.notes = $requestData.notes
                        }
                    }

                    $lead.updated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                    $leads[$leadIdx] = $lead
                    Save-Leads $leads

                    Send-JsonResponse $response 200 @{ success = $true; message = "Lead updated successfully" }
                    continue
                }
            }

            # Catch-all for undefined API routes
            Send-JsonResponse $response 404 @{ error = "API Route Not Found" }
            continue
        }

        # --- 6. Static File Server Route ---
        if ($urlPath -eq "/" -or [string]::IsNullOrEmpty($urlPath)) { 
            $urlPath = "/index.html" 
        }
        
        # Clean URLs: strip trailing slash
        if ($urlPath.EndsWith('/') -and $urlPath.Length -gt 1) {
            $urlPath = $urlPath.Substring(0, $urlPath.Length - 1)
        }

        $relPath = $urlPath.TrimStart('/')
        $relPath = $relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($currentDirectory, $relPath)
        
        # Clean URL fallback: check if appending .html works
        if (-not (Test-Path $filePath -PathType Leaf) -and -not [System.IO.Path]::HasExtension($filePath)) {
            $htmlPath = $filePath + ".html"
            if (Test-Path $htmlPath -PathType Leaf) {
                $filePath = $htmlPath
            }
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($extension) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".pdf"  { "application/pdf" }
                ".webp" { "image/webp" }
                ".gif"  { "image/gif" }
                ".ico"  { "image/x-icon" }
                ".json" { "application/json" }
                ".xml"  { "application/xml" }
                ".txt"  { "text/plain" }
                default { "application/octet-stream" }
            }
            
            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                $html = "<html><body><h1>500 Internal Server Error</h1><p>$($_.Exception.Message)</p></body></html>"
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($html)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $html = "<html><body><h1>404 Not Found</h1><p>File not found: $urlPath ($filePath)</p></body></html>"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($html)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        
        try {
            $response.OutputStream.Close()
        } catch {}
    }
} finally {
    $listener.Stop()
    Write-Host "Server stopped."
}
