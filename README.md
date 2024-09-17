<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RentalSphere</title>
</head>
<body>
  <div class="container" style="text-align: center;">
    <div class="header">
      <a href="https://imgur.com/GjpA6cF"><img src="https://i.imgur.com/GjpA6cF.jpg?1" alt="RentalSphere Logo " style="max-width: 80px;"></a>
    </div>
    <div class="content">
      <p>RentalSphere is a versatile platform that addresses the complexities of property management, streamlining operations for landlords while enhancing the rental experience for tenants through innovative features and analytics-driven insights.</p>
      <hr>
      <div class="feature">
        <h3>Build Rentalsphere</h3>
        <ol>
          <li>In the backend directory, run <code>./mvnw install</code>.</li>
          <li>After successful compilation and build, go to the root directory of the repository and run <code>docker-compose build</code>.</li>
          <li>After docker images are built successfully, run <code>docker-compose up</code>.</li>
          <li><kbd style="color: black; font-weight: bold;">Ctrl + c</kbd> to stop the containers.</li>
          <li>Please run <code>docker-compose down</code> after stopping the containers.</li>
        </ol>
      </div>
    </div>
</div>



<h3>Feature: Registration/Login</h3>

Scenario: User registers on the website

    Given a person visits the website for the first time
    When the person fills out the registration form with their details
    Then the person should submit the registration form
    And the person should be successfully registered as a user
    And their role on the website should be set as user

Scenario: User logs in with valid credentials

    Given a registered user wants to access the website
    When the user enters their username and password
    Then the user should be able to successfully log in
    And should gain access to user-specific features and functionalities

Scenario: Property manager's role gets added after property approval

    Given a user has registered and posted a property on the website
    And the property has been approved by the admin
    When the property manager logs in
    Then the user's role should be updated to include the property manager role

Scenario: Tenant's role gets added after tenant request approval

    Given a user has registered and applied for a property as a tenant
    And the tenant application has been approved by the property manager
    When the user logs in
    Then the user's role should be updated to include the tenant role

<h3>Feature: Property Postings</h3>

Scenario: User fills out property posting form

    Given a normal user is logged in
    When the user fills out the property posting form with relevant details
    Then the user should submit the property posting request
    And the request should be sent to the admin for review

Scenario: Admin approves property posting request

    Given the admin is logged in
    And there is a pending property posting request
    When the admin reviews and approves the property posting request
    Then the property should be successfully posted on the website
    And the user's role should be changed to property manager

Scenario: Property manager adds further properties

    Given a user has the role of property manager
    When the property manager wants to add a new property posting
    Then the property manager should be able to add the property without admin approval
    And the newly added property should be immediately visible on the website


<h3>Feature: Tenant Requests</h3>

Scenario: User applies for a property posting

    Given a normal user is logged in
    And the user is viewing a property posting they are interested in
    When the user fills out the tenant application form for that property
    Then the user should submit the tenant application request
    And the request should be sent to the respective property manager for review

Scenario: Property manager reviews tenant application

    Given the property manager is logged in
    And there is a pending tenant application request for their property
    When the property manager reviews the tenant application
    Then the property manager should have the option to approve or decline the request

Scenario: Property manager approves tenant application

    Given the property manager approves a tenant application request
    Then the user who applied should be granted tenant access to the property
    And the user's role on the website should be updated to include both user and tenant roles

Scenario: User views property as a tenant

    Given a user has been granted tenant access to a property
    When the user views the property listing
    Then the user should see the tenant view of the property details
    And the user should have access to tenant-specific features and information

<h3>Feature: Admin Page</h3>

Scenario: Admin views property requests

    Given the admin is logged in with admin credentials
    When the admin accesses the admin page
    Then the admin should be able to view a list of property requests
    And each request should display relevant details for review

Scenario: Admin reviews property request

    Given the admin is viewing a property request on the admin page
    When the admin reviews the details of the property request
    Then the admin should have the option to accept or decline the request

Scenario: Admin accepts property request

    Given the admin decides to accept a property request
    Then the property associated with the request should be approved and posted on the website

Scenario: Admin declines property request

    Given the admin decides to decline a property request
    Then the property associated with the request should not be approved or posted on the website


<h3>Feature: Lease Management</h3>

Scenario: Property manager adds a new lease

    Given a property manager is logged in
    When the property manager adds a new lease for their property with start date, end date, rent, etc.
    Then the new lease should be successfully added to the property

Scenario: Property manager updates an existing lease

    Given a property manager is logged in
    And there exists an existing lease for their property
    When the property manager updates the lease with new details such as start date, end date, or rent
    Then the lease should be successfully updated with the new information

Scenario: Property manager removes a lease

    Given a property manager is logged in
    And there exists an existing lease for their property
    When the property manager removes the lease
    Then the lease should be successfully removed from the property

Scenario: Tenant views property lease

    Given a tenant is connected to a property
    When the tenant views the property details
    Then the tenant should be able to view the lease details for that property


<h3>Feature: Announcements</h3>

Scenario: Property manager adds a new announcement

    Given a property manager is logged in
    When the property manager adds a new announcement with a title and description
    Then the new announcement should be successfully added for all tenants connected to their properties

Scenario: Property manager updates an existing announcement

    Given a property manager is logged in
    And there exists an existing announcement
    When the property manager updates the announcement with new title and/or description
    Then the announcement should be successfully updated for all tenants connected to their properties

Scenario: Property manager deletes an announcement

    Given a property manager is logged in
    And there exists an existing announcement
    When the property manager deletes the announcement
    Then the announcement should be successfully removed for all tenants connected to their properties

Scenario: Tenant views property announcements

    Given a tenant is connected to a property
    When the tenant views the property details
    Then the tenant should be able to view the announcements posted by the property manager for that property

<h3>Feature: Marketplace</h3>

Scenario: Tenant posts an item for sale

    Given a tenant with the role of tenant is logged in
    When the tenant posts an item for sale in the marketplace with relevant details
    Then the item should be successfully posted for other tenants to view

Scenario: Tenant views items for sale in the marketplace

    Given a tenant with the role of tenant is logged in
    When the tenant accesses the marketplace
    Then the tenant should be able to view all items posted for sale by other tenants

Scenario: Tenant expresses interest in buying an item

    Given a tenant with the role of tenant is logged in
    And the tenant views an item they are interested in buying
    When the tenant clicks on the item for more details
    Then the tenant should be redirected to their mail application with the receiver set as the posting tenant's email address for further communication


<h3>Feature: Violation Log System</h3>

Scenario: Property manager logs a violation

    Given a property manager is logged in
    When the property manager logs a violation on their property with a description, intensity, and any associated monetary cost
    Then the violation should be successfully added to the violation log for the property

Scenario: Tenant views violation log

    Given a tenant is connected to a property
    When the tenant views the property details
    Then the tenant should be able to view the violation log for that property, including descriptions, intensity, and any associated monetary costs
    <h3>Feature: Dashboard Analytics (Property Manager)</h3>

<h3>Feature: Dashboard Analytics (Property Manager)</h3>

Scenario: Property manager views dashboard analytics

    Given a property manager is logged in
    When the property manager accesses their dashboard
    Then the property manager should be able to see an overview of all related features, such as lease management, announcements, violation log, etc.
    And clicking on each feature should allow the property manager to navigate to that specific feature for further details and actions

<h3>Feature: Dashboard Analytics (Tenant)</h3>

Scenario: Tenant views dashboard analytics

    Given a tenant is logged in
    When the tenant accesses their dashboard
    Then the tenant should be able to see an overview of all related features, such as property details, marketplace, violation log, etc.
    And clicking on each feature should allow the tenant to navigate to that specific feature for further details and actions


## Dependency

<table>
<thead>
<tr>
<th>Dependency</th>
<th>Version</th>
<th>Usage</th>
<th>Link</th>
</tr>
</thead>
<tbody>
<tr>
<td>SpringBoot</td>
<td>3.1.4</td>
<td>Java Framework for REST APIs</td>
<td><a href="https://spring.io/projects/spring-boot">Link</a></td>
</tr>
<tr>
<td>Spring Security</td>
<td>3.1.4</td>
<td>Authentication and access-control framework</td>
<td><a href="https://spring.io/projects/spring-security">Link</a></td>
</tr>
<tr>
<td>Lombok</td>
<td>1.18.30</td>
<td>Autogenerate getter setters in POJO classes.</td>
<td><a href="https://projectlombok.org/">Link</a></td>
</tr>
<tr>
<td>MySQL Connector</td>
<td>8.1.0</td>
<td>Connects application to the MySQL</td>
<td><a href="https://mvnrepository.com/artifact/mysql/mysql-connector-java">Link</a></td>
</tr>
<tr>
<td>JSON WebToken</td>
<td>0.11.2</td>
<td>Generates JWTs in the application for authorization.</td>
<td><a href="https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-impl">Link</a></td>
</tr>
<tr>
<td>Cloudinary</td>
<td>1.34.0</td>
<td>Cloud storage and image/video manipulation service.</td>
<td><a href="https://cloudinary.com/documentation/java_integration">Link</a></td>
</tr>
<tr>
<td>JUnit5</td>
<td>5.9.2</td>
<td>Unit testing of the modules.</td>
<td><a href="https://junit.org/junit5/docs/current/user-guide/">Link</a></td>
</tr>
<tr>
<td>Thymeleaf</td>
<td>3.1.4</td>
<td>Templating engine for HTML emails.</td>
<td><a href="https://www.thymeleaf.org/">Link</a></td>
</tr>
<tr>
<td>JSON WebToken (jjwt-jackson)</td>
<td>2.15.3</td>
<td>Generates JWTs in the application for authorization. </td>
<td><a href="https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-jackson">Link</a></td>
</tr>
</tbody>
</table>

<hr />

## Code Coverage

![Static Badge](https://img.shields.io/badge/JUnit_Test_Cases-124-blue)
![Static Badge](https://img.shields.io/badge/Class_Coverage-82%25-blue)
![Static Badge](https://img.shields.io/badge/Method_Coverage-64%25-blue)
![Static Badge](https://img.shields.io/badge/Line_Coverage-69%25-blue)

<hr />

## Our Contributors

Yash Walia  
[LinkedIn](https://www.linkedin.com/in/yash-walia/)  
[GitHub](https://github.com/ywalia01)

Raj Patel  
[LinkedIn](https://www.linkedin.com/in/raj-patel-160711244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)  
[GitHub](https://github.com/rajkp10)

Kaushal Sapara  
[LinkedIn](https://www.linkedin.com/in/sapara-kaushal/)  
[GitHub](https://github.com/Kaushal0904)

Harsh Maisuri  
[LinkedIn](https://www.linkedin.com/in/harsh-maisuri-797b1616b/)  
[GitHub](https://github.com/HarshMaisuri)

Yukta Gurnani  
[LinkedIn](https://www.linkedin.com/in/yukta-gurnani-765b61213?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)  
[GitHub](https://github.com/Yukta-Gurnani)

<hr />
