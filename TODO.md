# Backend Assignment

### Problem Statement:
You need to build a website backend (Rest API) where a `creator` and `listener` manage their `Podcasts`. A Creator can create `album`, `generes`, `tags` and they can upload `songs` and `podcasts` to the system. Songs & podcasts can be present in multiple `albums` and `generes`. A Listener can then search for podcasts and/or songs using `song name`, `album` and `generes` and also can filter using `album`, `generes` and `tags`.

#### User Stories
1. As a singer, I can upload a podcast.
2. As a singer, I can create, edit, delete album.
3. As a singer, I can create, edit, delete generes.
4. As a singer, I can create, edit, delete tags.
5. As a singer, I can upload a song.
6. As a singer, I can add new tag while uploading song.
7. As a listener, I can see list of podcasts.
8. As a listener, I can search podcast by name.
9. As a listener, I can filter podcast & songs by album, generes, tags.
10. As a listener, when I am playing a song, I can get suggested song list using current data.

Build the application keeping in mind that data duplicacy and time complexity should be minimized.

### Submissions Required
- Technical Documentation walking through the solution & process
- ER diagram of the database
- Complete Source Code with instructions to run the app

### Instructions for submitting the assignment
-   Create a  **private**  fork of the repository
-   Make the changes & commit/push the code to your fork
-   Write steps to run this application inside README.md
-   Provide access to  `mindship-tech`  github account
-   Let your contact at Mindship know that you have provided the access
-   That's it, our team will take care of the rest :)

### Important Notes:
-   Use any of the following technologies to build the backend: `Golang`, `Node`, `Python` or `Ruby`.
-   We are really, really interested in your object oriented development skills, so please solve the problem keeping this in mind. Also handle the edge cases (if any).
-   Your codebase should have the same level of structure and organised as any mature open source project including coding conventions, directory structure, a README.md with clear instructions and additionally a runner shell script that automates the entire build and execute process.
-   You need to use Git for version control. We expect you to send us a standard zip or tarball of your source code when you're done that includes git metadata (the .git folder) in the tarball so that we can look at your commit logs and understand how your solution has evolved. Frequent commits are a huge plus.
-   Do not check in vendor libraries or output from the build process. Use a standard build automation & dependency system like go modules/npm.
-   Do not make your solution or this problem publicly available by, for example, using GitHub or Bitbucket or by posting this problem to a blog or forum.
