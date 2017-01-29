(function(){
    
    var rotateScale = .25;
    var translateScale = 5;
    var translateSmallScale = .5;
    
    var go = function(ev){
        
        window.addEventListener('mousemove', function(ev){
            var posX = (1-(ev.clientX/window.innerWidth))*translateScale - (translateScale/2);
            var posY = (1-(ev.clientY/window.innerHeight))*translateScale - (translateScale/2);
            var posSmallX = (1-(ev.clientX/window.innerWidth))*translateSmallScale - (translateSmallScale/2);
            var posSmallY = (1-(ev.clientY/window.innerHeight))*translateSmallScale - (translateSmallScale/2);
            var rotateX = (1-(ev.clientX/window.innerWidth))*rotateScale - (rotateScale/2);
            var rotateY = (ev.clientY/window.innerHeight)*rotateScale - (rotateScale/2);
            
            requestAnimationFrame(function(){
                document.querySelector('.🌈').style.transform = 
                'translateX('+posX+'em) translateY('+posY+'em) rotateY('+rotateX+'deg) rotateX('+rotateY+'deg) translateZ(-.2em)';
                
                document.querySelector('.🎒-👅').style.transform = 
                'translateX('+posSmallX+'em) translateY('+posSmallY+'em) translateZ(4em)'
            });

        });
        
    };
    
    if(document.readyState === "interactive") go();
    else window.addEventListener('DOMContentLoaded',go);
    
})();