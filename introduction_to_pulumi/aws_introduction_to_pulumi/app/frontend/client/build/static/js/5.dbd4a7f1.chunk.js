(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{45:function(e,t,s){"use strict";function c(e,{body:t,...s}={}){const c={method:t?"POST":"GET",...s,headers:{"content-type":"application/json",...s.headers}};return t&&(c.body=JSON.stringify(t)),window.fetch(`/api/${e}`,c).then((async e=>{const t=await e.json();return e.ok?t:Promise.reject(t)}))}s.d(t,"a",(function(){return c}))},67:function(e,t,s){e.exports={view_wrapper:"product_view_wrapper__2mzXD",view_background:"product_view_background__1faTq",full_view:"product_full_view__2qZzi",view_foreground:"product_view_foreground__1uxUO",view_controller:"product_view_controller__1mbFE",right_aligned:"product_right_aligned__23i1V",arrow_btns:"product_arrow_btns__3xb94",fs_btn:"product_fs_btn__3S3mq",dark_btn:"product_dark_btn__oJwtZ",product_details:"product_product_details__2VYs5",details_meta:"product_details_meta__1bpPX",breadcrumb:"product_breadcrumb__33chX",details_id:"product_details_id__3cPlV",details_info:"product_details_info__2oZe7",details_more:"product_details_more__1UtS-",colors:"product_colors__1iUae",ratings_reviews:"product_ratings_reviews__10TY-",r_count:"product_r_count__1vrSx",stars:"product_stars__6Fiai",details_actions:"product_details_actions__3lf0W",size_details:"product_size_details__1kf2w",action_buy:"product_action_buy__28oM5",price:"product_price__3ZtTI",price_big:"product_price_big__3xaNR",buy_icon:"product_buy_icon__1LIhi",preview:"product_preview__27lGa",preview_large:"product_preview_large__3dueA",cover:"product_cover__3fgp4",cover_large:"product_cover_large__3vQ25",buy_text:"product_buy_text__1knkt"}},70:function(e,t,s){"use strict";s.r(t);var c=s(0),a=s(2),i=s(9),r=s(52),n=s.n(r),o=(s(65),s(11)),d=s(18),l=s(45),_=s(66),b=s.n(_),j=s(67),p=s.n(j),u=(s(68),s(69),s(1));const m={superLargeDesktop:{breakpoint:{max:4e3,min:1921},items:3},desktop:{breakpoint:{max:1920,min:1201},items:2},tablet:{breakpoint:{max:1200,min:0},items:1}},x={preview:{breakpoint:{max:4e3,min:0},items:1}},h=({next:e,previous:t,goToSlide:s,...c})=>Object(u.jsxs)("div",{className:p.a.arrow_btns,children:[Object(u.jsx)("button",{type:"button",onClick:()=>t(),children:Object(u.jsx)("span",{className:"material-icons",children:"chevron_left"})}),Object(u.jsx)("button",{type:"button",onClick:()=>e(),children:Object(u.jsx)("span",{className:"material-icons",children:"chevron_right"})})]}),O=({product:e})=>Object(u.jsx)(n.a,{infinite:!0,partialVisible:!1,responsive:x,keyBoardControl:!0,swipeable:!0,showDots:!1,arrows:!1,customButtonGroup:Object(u.jsx)(h,{totalItems:5}),renderButtonGroupOutside:!0,children:e.images.map(((t,s)=>Object(u.jsx)("div",{className:p.a.preview_large,children:Object(u.jsx)("div",{className:p.a.cover_large,children:Object(u.jsx)("img",{src:t.src,alt:e.name})})},s)))}),v=({product:e})=>Object(u.jsx)(n.a,{infinite:!0,partialVisible:!1,responsive:m,keyBoardControl:!0,swipeable:!0,showDots:!1,arrows:!1,customButtonGroup:Object(u.jsx)(h,{totalItems:5}),renderButtonGroupOutside:!0,children:e.images.map(((t,s)=>Object(u.jsx)("div",{className:p.a.preview,children:Object(u.jsx)("div",{className:p.a.cover,children:Object(u.jsx)("img",{src:t.src,alt:e.name})})},s)))});t.default=()=>{let{id:e}=Object(a.g)();const{setProduct:t}=Object(c.useContext)(o.a),[s,r]=Object(c.useState)(null),[n,_]=Object(c.useState)([]),[j,m]=Object(c.useState)(!0),[x,h]=Object(c.useState)(1);Object(c.useEffect)((()=>{document.body.classList.add("noscroll-web"),document.body.classList.remove("trans")}),[]),Object(c.useEffect)((()=>{const t=`products/${e.split("-").pop()}`;Object(l.a)(t).then((e=>{r(e.data.product);const t=e.data.product.images.map((e=>({name:e.color,code:e.hex}))).filter(((e,t,s)=>s.findIndex((t=>t.name===e.name))===t));_(t),m(!1)})).catch((e=>{r(null),m(!1)}))}),[e]);const[w,g]=Object(c.useState)(!1);return j?Object(u.jsx)(d.a,{}):Object(u.jsx)("div",{children:Object(u.jsxs)("div",{className:`${p.a.view_wrapper} ${w?p.a.full_view:""}`,children:[Object(u.jsxs)("div",{className:p.a.view_background,children:[w?Object(u.jsx)(O,{product:s}):Object(u.jsx)(v,{product:s}),Object(u.jsx)("div",{className:`${p.a.view_controller} ${w?p.a.right_aligned:""}`,children:Object(u.jsx)("div",{className:p.a.fs_btn,children:w?Object(u.jsx)("button",{type:"button",className:p.a.dark_btn,onClick:e=>g(!1),children:Object(u.jsx)("span",{className:"material-icons",children:"close"})}):Object(u.jsx)("button",{type:"button",onClick:e=>g(!0),children:Object(u.jsx)("span",{className:"material-icons",children:"add"})})})})]}),!w&&Object(u.jsx)("div",{className:p.a.view_foreground,children:Object(u.jsxs)("div",{className:p.a.product_details,children:[Object(u.jsxs)("div",{className:p.a.details_meta,children:[Object(u.jsxs)("ul",{className:p.a.breadcrumb,children:[Object(u.jsx)("li",{children:Object(u.jsx)(i.b,{to:"/",children:"Home"})}),Object(u.jsx)("li",{children:"Products"}),Object(u.jsx)("li",{children:s.category}),Object(u.jsx)("li",{children:(e=>{let t="";switch(e){case 2:t="Men";break;case 3:t="Women";break;case 4:t="Unisex";break;case 5:t="Kids";break;default:t="All"}return t})(s.customerType)})]}),Object(u.jsxs)("span",{className:p.a.details_id,children:["Id: ",s.productCode]})]}),Object(u.jsxs)("div",{className:p.a.details_info,children:[Object(u.jsx)("h2",{children:s.name}),Object(u.jsx)("p",{children:s.description})]}),Object(u.jsxs)("div",{className:p.a.details_more,children:[Object(u.jsx)("div",{className:p.a.colors,children:n.map(((e,t)=>Object(u.jsx)("span",{title:e.name,style:{backgroundColor:e.code,border:`1px solid ${"White"===e.name?"#ddd":e.code}`},className:`${x===t+1?p.a.selected_color:""}`,onClick:e=>h(t+1)},t)))}),Object(u.jsxs)("div",{className:p.a.ratings_reviews,children:[Object(u.jsxs)("div",{className:p.a.r_count,children:[s.ratings.total," Reviews"]}),Object(u.jsxs)("div",{className:p.a.stars,children:[Object(u.jsx)("span",{className:"material-icons",children:"star"}),Object(u.jsx)("span",{className:"material-icons",children:"star"}),Object(u.jsx)("span",{className:"material-icons",children:"star"}),Object(u.jsx)("span",{className:"material-icons",children:"star_half"}),Object(u.jsx)("span",{className:"material-icons",children:"star_outline"})]})]})]}),Object(u.jsxs)("div",{className:p.a.price_big,children:[s.currency.format," ",s.price.toFixed(2)]}),Object(u.jsxs)("div",{className:p.a.details_actions,children:[Object(u.jsxs)("div",{className:p.a.size_details,children:[Object(u.jsx)("span",{children:"Available sizes:"}),Object(u.jsxs)("span",{children:["US ",s.sizes.join(", ")]})]}),Object(u.jsxs)("div",{className:p.a.action_buy,onClick:function(){t({qty:1,product:s}),new b.a({layout:"bottomCenter",progressBar:!1,text:`<div style="display:flex; align-items: center;gap:15px;"><img width="40" src=${s.images[0].src} alt='sneaker' /> <div>Added to cart</div></div>`,theme:"relax",timeout:1e3}).show()},children:[Object(u.jsxs)("span",{className:p.a.price,children:[" ",s.currency.format," ",s.price.toFixed(2)]}),Object(u.jsx)("span",{className:p.a.buy_text,children:"Add to Cart"}),Object(u.jsx)("span",{className:`material-icons ${p.a.buy_icon}`,children:"shopping_cart"})]})]})]})})]})})}}}]);
//# sourceMappingURL=5.dbd4a7f1.chunk.js.map