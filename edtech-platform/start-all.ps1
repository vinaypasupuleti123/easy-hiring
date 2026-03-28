$services = "user-service", "course-service", "enrollment-service", "placement-service", "assessment-service", "notification-service", "api-gateway"
foreach ($service in $services) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\Vinay\Easy Hiring\edtech-platform\backend\$service'; mvn spring-boot:run"
}
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\Vinay\Easy Hiring\edtech-platform\frontend'; npm run start"
