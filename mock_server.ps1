$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server started at http://localhost:8080/ - DO NOT CLOSE TERMINAL"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $path = $request.Url.LocalPath

        if ($path -eq "/" -or $path -eq "/index.html") {
            $content = Get-Content -Raw "d:\porfolio\preview.html"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentType = "text/html"
        }
        elseif ($path -eq "/api/config/about") {
            $json = '{"bio": "Hello! I am Brahma Teja Jampu. Welcome to my OS portfolio preview.", "skills": "React, Python, Robotics, AI, UI/UX"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
        }
        elseif ($path -eq "/api/projects") {
            $json = '[{"title": "Robotics OS", "description": "A simulated robotics interface built with modern web technologies.", "demo_url": "#", "github_url": "#"}, {"title": "Portfolio v2", "description": "This new OS style interface you are seeing right now.", "demo_url": "#", "github_url": "#"}]'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
        }
        else {
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.StatusCode = 404
        }

        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
