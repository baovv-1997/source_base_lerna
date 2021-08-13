# Pikapaka Front-end

- This project was built on Nextjs framework, support for bold CSR and SSR technically
- For getting more document, pls refer this link https://nextjs.org/docs

## Technical stacks

1. Next framework v11.0.1
2. React JS v17.0.2
3. Redux v7.2.4
4. React hook form v7.10.0
5. Tailwindcss v2.2.4

## Project structure

    +-- client                              # Thư mục cho source client
    |   +-- configs                         # Config cho project
    |   +-- src                             # Source code
    |        +-- components                 # Chứa các component
    |        +-- containers                 # Chứa các container
    |        +-- hocs                       # Nơi khai báo các Hight order component
    |        +-- hooks                      # Chứa các custom hook
    |        +-- pages                      # Mỗi file sẽ được build thành một page của web
    |        +-- services                   # Chứa các service như call api...
    |        +-- stores                     # Bao gồm những gì liên quan đến store
    |            +-- actions                # Định nghĩa các action cho dispatch action
    |            +-- reducers               # Định nghĩa các state và sử  lí update state
    |        +-- utilities                  # Cung cấp các hàm tiện tích nhỏ gọn cho dự án
    |        +-- styles                     # Chứa coding style, theme
    +-- node_modules
    +-- public                              # Chứa các tài nguyên của project (image, font, ...)
    +-- .example.env                        # Config environment cho nodejs
    +-- .eslintrc.js                        # config cho eslint check coding convention
    +-- tailwind.config.js                  # config cho tailwindcss
    +-- .gitignore
    +-- package.json
    +-- Readme.md

## Development setup

1. Init config app

   `cp -R configs.example configs`

2. Install dependencies library

   `npm install`

3. Run project as development environment

   `npm run dev`

==> Url: http://localhost:3000

4. Build project

   `npm run build`

5. Export project to static file

   `npm run export`
