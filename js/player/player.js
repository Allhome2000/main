document.write("<style>@font-face { font-family: 'fontsans';  font-style: normal;font-weight: normal; src: url('https://tools.1abzar.com/font-sans/IRANSansWeb(FaNum).eot') format('embedded-opentype'), url('https://tools.1abzar.com/font-sans/IRANSansWeb(FaNum).woff') format('woff'), url('https://tools.1abzar.com/font-sans/IRANSansWeb(FaNum).ttf') format('truetype')}</style>");document.write("<div id='player1' class='aplayer'><div style='padding:10px;font-size:12px;text-align:center'> ... </div></div>");
 (function (){
           var sourceaaa = 'https://tools.1abzar.com/abzar/tools/player/APlayer.min.js';
            var scriptaaa = document.createElement('script');
                scriptaaa.setAttribute('type', 'text/javascript');
                scriptaaa.setAttribute('src', sourceaaa);
                document.head.prepend(scriptaaa);
   scriptaaa.onload = function () {
var ap = new APlayer({
    element: document.getElementById('player1'),                      
        narrow: false,                                                     
        autoplay: false,                                                    
        showlrc: 0,                                                        
        mutex: true,                                                       
        theme: '#EA5B2F',                                                  
        mode: 'circulation',                                                
        preload: 'metadata',                                               
        listmaxheight: '380px',                                           
        music: listmusic1abzar        
    });
        if(document.getElementById('player1').clientWidth < 300){document.getElementsByClassName('aplayer-ptime')[0].style.display='none';document.getElementsByClassName('khati')[0].style.display='none';}

    };

})();
var listmusic1abzar=[];
