'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sign-up.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace the arrow button CSS to make them bigger, bolder, and fully visible inside the image
const oldBtnCss = `          .gw-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:3;
            width:48px;height:48px;border-radius:50%;border:none;cursor:pointer;
            background:#fff;color:#AE360E;font-size:20px;font-weight:900;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 3px 14px rgba(0,0,0,0.25);transition:background .2s,color .2s;}
          .gw-btn:hover{background:#AE360E;color:#fff;}
          .gw-btn:active{transform:translateY(-50%) scale(0.94);}
          .gw-prev{left:-16px;}
          .gw-next{right:-16px;}`;

const newBtnCss = `          .gw-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:3;
            width:52px;height:52px;border-radius:50%;border:3px solid #fff;cursor:pointer;
            background:#AE360E;color:#fff;font-size:24px;font-weight:900;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 4px 18px rgba(0,0,0,0.4);transition:background .2s,transform .15s;}
          .gw-btn:hover{background:#8f2a0a;}
          .gw-btn:active{transform:translateY(-50%) scale(0.92);}
          .gw-prev{left:10px;}
          .gw-next{right:10px;}`;

if (!html.includes(oldBtnCss)) {
  console.error('ERROR: Could not find arrow CSS block to replace');
  process.exit(1);
}

html = html.replace(oldBtnCss, newBtnCss);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Done - arrows updated to bold red, inside the image');
