window.onload=function () {
    document.querySelector('.cateLeft').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    document.querySelector('.cateRight').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    new IScroll(document.querySelector('.cateLeft'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.cateRight'),{
        scrollX:true,
        scrollY:true
    });
};