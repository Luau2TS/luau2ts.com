"use strict";(self.webpackChunkluau2ts_com=self.webpackChunkluau2ts_com||[]).push([["452"],{5741(e,s,t){t.r(s),t.d(s,{default:()=>p});var i=t(1325),l=t(3526),a=t(7147),r=t(1139),n=t(1372),c=t(2837);let o="section_Q9Zo",d="featuredPane_wIC5",u="featuredPaneHeader_Ox5H",h=`local Animal = setmetatable({}, {})
Animal.__index = Animal

function Animal.new(name)
  local self = setmetatable({}, Animal)
  self.name = name
  return self
end

function Animal:greet()
  return "Hello, " .. self.name
end`,m=`class Animal {
  constructor(public name: string) {}

  greet(): string {
    return \`Hello, \${this.name}\`;
  }
}

const yui = new Animal('Yui');
print(yui.greet());`;function x(){let{siteConfig:e}=(0,r.A)();return(0,i.jsx)("header",{className:(0,l.A)("hero hero--primary","heroBanner_qdFl"),children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("img",{src:"img/logo.png",alt:"luau2ts",style:{width:160,height:160,marginBottom:"1.5rem"}}),(0,i.jsx)(c.A,{as:"h1",className:"hero__title",children:e.title}),(0,i.jsx)("p",{className:"hero__subtitle",children:e.tagline}),(0,i.jsxs)("div",{className:"buttons_AeoN",children:[(0,i.jsx)(a.A,{className:"button button--secondary button--lg",to:"/docs/",children:"Get started \u2192"}),(0,i.jsx)(a.A,{className:"button button--outline button--lg",to:"/playground",children:"Try it live"})]})]})})}function j(){return(0,i.jsx)("section",{className:"featured_CcDY",children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)("div",{className:"featuredHeader_jGRf",children:"Luau in, TypeScript out"}),(0,i.jsxs)("div",{className:"featuredGrid_N7Ro",children:[(0,i.jsxs)("div",{className:d,children:[(0,i.jsx)("div",{className:u,children:"example.luau"}),(0,i.jsx)("pre",{children:(0,i.jsx)("code",{children:h})})]}),(0,i.jsx)("div",{className:"featuredArrow_EAXV","aria-hidden":!0,children:"\u2192"}),(0,i.jsxs)("div",{className:d,children:[(0,i.jsx)("div",{className:u,children:"example.ts"}),(0,i.jsx)("pre",{children:(0,i.jsx)("code",{children:m})})]})]})]})})}function p(){let{siteConfig:e}=(0,r.A)();return(0,i.jsxs)(n.A,{title:e.title,description:"Compile Luau to TypeScript for Roblox. Drop-in compatible with roblox-ts.",children:[(0,i.jsx)(x,{}),(0,i.jsx)(j,{}),(0,i.jsxs)("main",{className:"main_iUjq",children:[(0,i.jsx)("section",{className:o,children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)(c.A,{as:"h2",children:"Why?"}),(0,i.jsxs)("p",{children:[(0,i.jsx)("a",{href:"https://roblox-ts.com",children:"roblox-ts"})," compiles TypeScript to Luau."," ",(0,i.jsx)("code",{children:"luau2ts"})," is the mirror: it compiles ",(0,i.jsx)("strong",{children:"Luau to TypeScript"}),". Migrate an existing Luau codebase to TS, run authored Luau through TS-native tooling, or round-trip with roblox-ts."]})]})}),(0,i.jsx)("section",{className:o,children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)(c.A,{as:"h2",children:"Install"}),(0,i.jsx)("pre",{children:(0,i.jsx)("code",{children:"npm install -g luau2ts"})}),(0,i.jsx)("pre",{children:(0,i.jsx)("code",{children:`luau2ts foo.luau                          # \u{2192} stdout
luau2ts foo.luau -o foo.ts                # \u{2192} file
luau2ts src/ -o out/                      # \u{2192} directory tree
luau2ts -p default.project.json -o out/   # \u{2192} Rojo project`})})]})}),(0,i.jsx)("section",{className:o,children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsx)(c.A,{as:"h2",children:"Compatibility"}),(0,i.jsxs)("p",{children:["Ships two emit modes: ",(0,i.jsx)("code",{children:"rbxts"})," for the ",(0,i.jsx)("code",{children:"@rbxts/*"})," ecosystem, and"," ",(0,i.jsx)("code",{children:"native"})," for runtimes that mirror Roblox's Luau API. 100% Luau conformance against the upstream test suite. Source maps included."]}),(0,i.jsx)("p",{children:(0,i.jsx)(a.A,{to:"/docs/",children:"Read the docs \u2192"})})]})})]})]})}}}]);