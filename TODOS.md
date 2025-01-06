* Notes Generator Tool

As an educator, I want to generate concise, structured notes from various types of input so that I can save time and provide students with clear, summarized learning materials. This tool will help streamline the process of breaking down lengthy content into actionable and digestible notes.

The tool should allow users to:

    Input content directly or upload files to generate notes.
    Provide a focus or topic for the notes to tailor the generated output.
    Accept file uploads (one file per prompt) in supported formats:

| PDF       | Portable Document Format | `load_pdf_documents` |
| CSV       | Comma-Separated Values | `load_csv_documents` |
| TXT       | Plain Text | `load_txt_documents` |
| MD        | Markdown | `load_md_documents` |
| URL       | Web URL | `load_url_documents` |
| Youtube URL       | Youtube URL | `summarize_transcript_youtube_url` |
| PPTX      | PowerPoint Presentation | `load_pptx_documents` |
| DOCX      | Word Document | `load_docx_documents` |
| XLS       | Excel Spreadsheet | `load_xls_documents` |
| XLSX      | Excel Spreadsheet | `load_xlsx_documents` |
| XML       | XML Document | `load_xml_documents` |
| Google Docs | Documents from Google Drive | `load_gdocs_documents` |
| Google Sheets | Spreadsheets from Google Drive | `load_gsheets_documents` |
| Google Slides | Presentations from Google Drive | `load_gslides_documents` |
| Google PDFs | PDFs from Google Drive | `load_gpdf_documents` |
| Images | PNG, JPG, JPEG | `generate_concepts_from_img` |

    Generate structured notes based on the input, organized into bullet points, paragraphs, or tables.
    Export notes in formats such as plain text, DOCX, or PDF.



Guidelines: 

Be sure to look over these  

1. Code Quality

    Objective: Maintain clean, efficient, and maintainable code to reduce technical debt and ensure long-term scalability.
    Practices:
        Consistent Code Style:
            Follow JavaScript ES6+ conventions for frontend development.
            Adhere to PEP-8 for Python backend code.
            Use linters (e.g., ESLint for JavaScript, Flake8 for Python) to enforce style consistency.
        Code Reviews:
            All code changes must go through a Pull Request (PR) review process on GitHub.
            Reviewers check for logic errors, adherence to coding standards, and optimization opportunities.
        Automated Testing:
            Write unit, integration, and end-to-end tests for critical functionalities.
            Use testing frameworks such as Jest for frontend code and Pytest for backend services.
    Example:
        Before deploying an update to Marvel’s summarization backend, PRs undergo thorough reviews, ensuring logic correctness and efficiency.

2. Modular Architecture

    Objective: Build reusable and loosely coupled components to enhance scalability and maintainability.
    Practices:
        Component Reusability:
            Develop self-contained modules for frontend components in ReactJS.
            Build backend services as independent microservices, allowing them to scale or update independently.
        Separation of Concerns:
            Use clear separation between UI, business logic, and data layers.
        Interface Contracts:
            Define well-documented APIs for communication between modules.
    Example:
        Marvel’s recommendation engine is implemented as a standalone microservice, making it easy to scale or integrate with other AI agents.

3. Scalability

    Objective: Design systems to handle increasing user loads and adapt to changing requirements efficiently.
    Practices:
        Horizontal Scaling:
            Use stateless services for backend AI logic, deployed on scalable platforms like Cloud Run.
        Efficient Database Queries:
            Optimize database queries and indexing for high-performance data retrieval.
        Load Testing:
            Perform regular load tests to identify and mitigate bottlenecks.
    Example:
        Marvel’s summarization API is stress-tested to ensure it handles peak traffic during busy school hours without performance degradation.

4. Cost Efficiency

    Objective: Minimize resource usage while maintaining high performance and reliability.
    Practices:
        Pay-As-You-Go Services:
            Deploy backend services on serverless platforms, scaling resources dynamically based on demand.
        Caching Strategies:
            Use Redis for caching frequently accessed data to reduce database queries and response times.
        Optimized Deployments:
            Optimize Docker images for minimal resource consumption.
    Example:
        Marvel caches frequently used recommendations, reducing the need for repeated database queries and cutting down response times.

5. Security

    Objective: Ensure all systems are secure and protect sensitive data from breaches or unauthorized access.
    Practices:
        Environment Variables:
            Store sensitive information like API keys and database credentials securely in environment variables or secret managers.
        Access Control:
            Implement role-based access control (RBAC) for APIs and databases.
        Data Encryption:
            Enforce HTTPS for all frontend-backend communication.
            Encrypt sensitive data at rest and in transit.
        Vulnerability Management:
            Regularly scan dependencies for vulnerabilities and apply patches promptly.
    Example:
        Marvel’s backend services enforce HTTPS and validate API keys for every request to ensure secure communication.

6. Documentation

    Objective: Provide clear and comprehensive documentation to facilitate collaboration and ease onboarding for new contributors.
    Practices:
        Code-Level Documentation:
            Write docstrings for all functions, methods, and classes, describing their purpose and usage.
            Use tools like JSDoc for JavaScript and Sphinx for Python to generate readable documentation from code comments.
        API Documentation:
            Maintain up-to-date documentation for all APIs, including endpoints, parameters, and expected responses.
        Contributor Guides:
            Provide step-by-step guides on setting up the development environment, contributing to the project, and adhering to coding standards.
    Example:
        Marvel's API documentation includes detailed examples of how to query recommendations, making it easier for frontend developers to integrate the service.

7. Workflow and Collaboration

    Objective: Foster seamless collaboration and efficient workflows among development teams.
    Practices:
        Branching Strategy:
            Use GitHub’s branching model with feature branches for development, staging branches for testing, and a protected main branch for production.
        Issue Tracking:
            Track all tasks and bugs using GitHub Issues, categorizing them with labels like feature, bug, and priority: high.
        CI/CD Integration:
            Automate testing and deployment pipelines using GitHub Actions, ensuring consistent releases.
    Example:
        A feature branch for adding real-time notifications to Marvel is tested and merged into staging before being deployed to production.

8. Testing and Quality Assurance

    Objective: Identify and fix issues before they reach production to ensure high-quality releases.
    Practices:
        Test Coverage:
            Aim for 80%+ coverage in unit tests for critical modules.
        Integration Testing:
            Validate interactions between services, such as frontend-backend API calls.
        Regression Testing:
            Ensure new updates do not introduce bugs in existing features.
    Example:
        Before deploying updates to Marvel, integration tests verify the compatibility between its backend APIs and frontend workflows.

9. Versioning and Deployment Standards

    Objective: Maintain clear versioning and reliable deployment practices.
    Practices:
        Semantic Versioning:
            Use versioning to track major, minor, and patch updates (e.g., v1.2.0).
        Rollback Mechanisms:
            Maintain the ability to revert to previous stable releases if issues occur.
    Example:
        A new feature for Marvel’s recommendation engine is tagged as v1.3.0, with rollback scripts in place for v1.2.0 in case of failure.

