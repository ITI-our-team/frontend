### file structure should be like this

    | frontend folder
    | - has the package.json
    | backend folder called (wedify_backend)
    | * if the backend folder is name otherwise please modify this file

[package.json](package.json)

in the line

`"start:backend": "cd .. && cd <the name of the backend folder> && python manage.py runserver",`

don't forget to install concurrently

```bash
npm install concurrently
```

and activate the python `venv`

then you can run any command of these

```bash
npm run dev     # this runs vite dev
npm run start:frontend  # same as the one before
npm run start:backend  # run the backend server only
npm run start:all  # run both front and back server
```
