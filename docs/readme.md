---
layout: layout.njk
---

# Capillary North America Engineering Docs

## Domains & Practices Quick Links
* [.NET](dotnet.md)


## **General Tech Radar**
The general engineering tech radar is a tech agnostic look at tools and techniques that are useful across multiple engineering practices and domains. For a look at a more refined list for your discipline or domain, go to your domain specific page listed above. 

### **Tools**
Tools account for the IDEs, software, CI/CD services, version control solutions, etc. that we use day to day.

#### **Adopt** ✅
The tools in this list are tools that should be highly considered when developing any new or existing application at Persuade.
* ✅ **[Visual Studio Code](https://code.visualstudio.com/)** `[IDE]`: Visual Studio Code is the go-to, cross platform IDE for general application development. It seems to be the industry choice and is backed by a massive community of engineers and extension developers.

* ✅ **[Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)** `[Databases]`: If you can't find the right extension for Visual Studio Code to access, view, and execute queries against your database of choice, Azure Data Studio is a free, cross-platform database tool from Microsoft that uses the Visual Studio Code interface and allows for extensions, query saving, etc.

* ✅ **[Github](https://github.com/)** `[Version Control]`: Github his the version control service of choice. It offers generous free tiers, private repos, and easy to use CI/CD services.

* ✅ **[Github Actions](https://github.com/features/actions)** `[CI/CD]`: Github Actions is the go-to for writing CI/CD services for automating application building, testing, and deployment.

* ✅ **[Docker](https://www.docker.com/)** `[Containerization]`: Docker is the industry standard for application containerization and image development, which ensures the applications are built and run in a consistent, reproducible environment, regardless of the host machine state.

* ✅ **[Kubernetes](https://kubernetes.io/)** `[Container Orchestration]`: If your application warrants container orchestration, Kubernetes is the industry standard. If you need to orchestrate the deployment and configuration of multiple containers to drive an application (say micro-services, or any complex architecture), Kubernetes is the most feature rich tool to do so.

* ✅ **[JIRA](https://www.atlassian.com/software/jira)** `[Task Management]`: The tool we all love to hate, JIRA is still the go-to for orchestrating teams (with stories, tasks, and epics) for application development. 

------
#### **Learn** 📚
The tools in this list represent tools that we know we should learn or have a better understanding of, not only for our own internal application development, but for our clients.

* 📚 **[Terraform](https://www.terraform.io/)** `[Infrastructure as Code]` : Terraform allows you to use a declarative syntax to declare the cloud infrastructure you need for your application, and persist that in version control along with the rest of your code. Using their CLI tools, you can then run that definition against any of the major cloud providers and it will provision the resources needed to meet that definition file. This allows all team members context, visibility and access to see how the application environments are set up and effect change in those systems all without leaving their code + CLI tools.
  * **What we need to know**:
    * At what point should we be using Terraform vs manual provisioning and set-up?
    * How do we use Terraform?
    * Where should we store the Terraform files?

* 📚 **[Ansible](https://www.ansible.com/)** `[Infrastructure as Code]` : While there is quite a bit of overlap with Terraform when it comes to provisioning cloud infrastructure, Ansible is more focused on configuration management of the provisioned infrastructure after it has been provisioned. Think OS or library updates. Ansible uses a procedural definition, meaning its scripts (playbooks) and processed from top to bottom, where Terraform uses a declarative format, where order doesn't matter.
  * **What we need to know**:
    * At what point should we be using Ansible vs manual configuration and set-up?
    * How do we use Ansible?
    * Where should we store the config values?
  

* 📚 **[Makefiles](https://opensource.com/article/18/8/what-how-makefile)** `[Build Scripts]` : Makefiles are a great way to create cross-platform build scripts. Rather than depending on each frameworks own CLI tools like Node's `NPM` in combination with `package.json` to run scripts, or .NET's `dotnet` cli tool to build, run tests, etc. you can standardize on a single `make build` or `make test` command, which is defined within a `makefile` generally in the root of the project, and it allows you to obfuscate the underlying build tooling, making it easier for engineers to move between projects and have a consistent way to build both projects, regardless of technology.
  * **What we need to know**
    * Is this truly a cross-platform solution? What about Windows?
    * What are the Makefile best practices?

* 📚 **[Hashicorp Vault](https://www.vaultproject.io/)** `[Secrets & Configuration Management]` : Following the technique of Configuration as a Service, Vault is a hosted solution (can be self-hosted) that manages application configuration and secrets, allowing you to keep them outside of version control, CI/CD tools, and outside of cloud hosting provider interfaces.
  * **What we need to know**
    * Are there better alternatives for general configuration management? 
    * Does Vault support real time property updating?


* 📚 **[Podman](https://podman.io/)** `[Containerization]` : As `Docker` is slowly clamping down on the free use of Docker Desktop as a GUI for container management, new containerization services are coming out that adhere to the OCI (Open Container Initiative) protocol (same as Docker Images) to build and deploy container images. Podman is nearly indistinguishable from Docker and may have a better license of use.
    * **What we need to know**
      * What benefits does Podman have over Docker? 
      * Does this at all impact our ability to deploy and run containers on cloud providers?

* 📚 **[.HTTP Files](https://github.com/Huachao/vscode-restclient)** `[API Documentation]` : A growing trend in API documentation is to use `.http` files to hold examples calls to API endpoints. These files can exist in version control along side the codebase and can utilize scripting abilities to share variables among different documented API request. Not only can this be used for documentation but also as a tool to quickly hit endpoints or to run automated testing. Plugins exist in most major IDEs to support `.http` files. 

------
#### **Hold** 🛑
The tools in this list represent tools we should, if possible, no longer be using as part of ongoing or new application development.

* 🛑 **[Postman + Sync](https://www.postman.com/)** `[API Documentation]` : While Postman for stand-alone development is fine, as soon as it would become beneficial to share the API documentation and scripting with a team (which it almost always is), we should favor .HTTP Files as defined above. Postman + Team Sync has become an expensive and bloated tool set for simple API documentation.
  * Recommended Alternative: `.HTTP Files`

* 🛑 **[Azure DevOps](https://azure.microsoft.com/en-us/services/devops/)** `[Version Control + CI/CD]`: Microsoft's foray into services for version control and build pipelines is feature rich and highly customizable but it has a heavy reliance on Microsoft based authentication for provisioning access. It also is _just_ different enough to make it hard to ramp other engineers more familiar with Github into a system without effort.
  * Recommended Alternative : `Github`

------

### **Techniques**
While the tools section covers what we should use to build applications, this section covers **how** we should build an application. 

#### **Adopt** ✅
The techniques in this list are techniques that should be highly considered when developing any new or existing application at Persuade.
* ✅ **[Feature Flags](https://www.atlassian.com/continuous-delivery/principles/feature-flags)**

* ✅ **[CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)**

* ✅ **[Vertical Slice Architecture](https://jimmybogard.com/vertical-slice-architecture/)**

* ✅ **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)**

* ✅ **[Configuration as a Service](https://github.com/Azure/AppConfiguration#:~:text=Azure%20App%20Configuration%20is%20an,microservices%2C%20and%20other%20Azure%20resources.)** : Azure has a service offering, but that's just an example of this.

------
#### **Learn** 📚
The techniques in this list represent techniques that we know we should learn or have a better understanding of, not only for our own internal application development, but for our clients.
* 📚 **[Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)**
  * **What we need to know**:
    * When is it appropriate to use full DDD?
    * What are the benefits and tradeoffs of some of the concepts that come with DDD like [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)?

* 📚 **[Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)**
  * **What we need to know:**
    * What's the right way to get started with TDD?
    * How much is too much? Or is there such a thing? (when is it appropriate?)

------
#### **Hold** 🛑
The techniques in this list represent techniques we should, if possible, no longer be using as part of ongoing or new application development.

* 🛑 **[Horizontal Slice Architecture](https://beardedeagle.com/horizontal-slice-versus-vertical-slice/#:~:text=A%20horizontal%20slice%20is%20a,run%20out%20of%20viable%20choices.)**
  * Recommended Alternative : `Vertical Slice Architecture`

* 🛑 **[Traditional N-Tier Layered Architecture](https://www.baeldung.com/cs/n-tier-architecture)** : While Clean Architecture is also a layered architecture, it's all about inversion of control and the way those layers depend upon one another. The traditional n-tier architecture's layers are depend on each-other in a way that is less than ideal and causes complexity when moving services or infrastructure. 
  * Recommended Alternative : `Clean Architecture`. 