# Backend Assignment

### Story:
You need to build a website backend (Rest API) where `singer` and `listener` can authenticate using `Google` and `Facebook`, also manage `Podcast`. Singer can create `podcast`, `album`, `generes`, `tags` and they can upload `song` to the system. A song can be present in multiple `album`, `generes` and `podcast`. Listener can search podcast and song using `song name`, `album` and `generes` and also can filter using `album`, `generes` and `tags`.

1. As a singer, I can create, edit, delete podcast.
2. As a singer, I can create, edit, delete album.
3. As a singer, I can create, edit, delete generes.
4. As a singer, I can create, edit, delete tags.
5. As a singer, I can upload song.
6. As a singer, I can add new tag while uploading song.
7. As a user, I can see list of podcast.
8. As a user, I can search podcast by podcast name, song name.
9. As a user, I can filter podcast by album, generes, tags.
10. As a user, when I am playing a song, I can get suggested song list using current song data.

Build that application keeping in mind that data duplicacy and time complexity should be minimized.

### What need to submit ?
- Documentation
- ER diagram
- Source Code

### Instructions for submitting the assignment
-   Create a  **private**  fork of the repository
-   Make the changes & commit/push the code to your fork
-   Write steps to run this application inside README.md
-   Provide access to  `mindship-tech`  github account
-   Let your contact at Mindship know that you have provided the access
-   That's it, our team will take care of the rest :)

### Important Notice:
-   We are really, really interested in your object oriented development skills, so please solve the problem keeping this in mind. Also handle the edge cases (if any).
-   Your codebase should have the same level of structure and organised as any mature open source project including coding conventions, directory structure, a README.md with clear instructions and additionally a runner shell script that automates the entire build and execute process.
-   You need to use Git for version control. We expect you to send us a standard zip or tarball of your source code when you're done that includes git metadata (the .git folder) in the tarball so that we can look at your commit logs and understand how your solution has evolved. Frequent commits are a huge plus.
-   Do not check in vendor libraries or output from the build process. Use a standard build automation & dependency system like go modules/npm.
-   Do not make your solution or this problem publicly available by, for example, using GitHub or Bitbucket or by posting this problem to a blog or forum.