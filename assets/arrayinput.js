/* @name jquery plugin for arrayinput yii2 widget asset
 * @Author ejkot
 */
var arrayinput=[[]];
(function( $ ){
  var methods={
      init : function(options) {
          $(this).each(function(){
              var inputid=$(this).attr('id');
              var inputval=$(this).val().replace(/[^0-9A-Za-z,]/g,"");
              /* Получаем массив id-значений поля из строки атрибута value*/
              var inputarr=inputval.split(",");
              var a=inputid.split('-');
              b=[];
              b[a[1]]=inputarr;
              arrayinput[a[0]+'_'+a[1]]=inputarr;
              $(this).attr('type','hidden');
              $(this).kotArrayInput('reload');
          });         
      },
      reload : function(options) {
                  var inputid=$(this).attr('id');
                  var elem=$(this);
                  /* Достаем имя формы и имя поля из id поля*/
                  var a=inputid.split('-');           
                  var inputarr=arrayinput[a[0]+'_'+a[1]];
                  /* Достанем массив текстовых описаний каждого значения */
                  eval("var list="+a[0]+"['"+a[1]+"'];");
                  /* добавим в список элементы */
                  var content='';
                  $.each(inputarr,function(i,val){
                      content+="<li class='btn btn-default' data-id='"+val+"'>"+list[0][val]+"&nbsp;&nbsp;<a class='glyphicon glyphicon-remove'> </a></li>";
                  });
                  $("#items-"+inputid).html(content);
                  var dropdown='';
                  $.each(list[0],function(i,val){
                      var dataid=i.trim();
                      dropdown+='<li class="'+((arrayinput[a[0]+'_'+a[1]].indexOf(i)===-1) ? '' : 'disabled')+'"><a href="#" data-id="'+dataid+'">'+val+'</a></li>';
                  });
                  dropdown='<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Добавить<span class="caret"></span></button><ul class="dropdown-menu">'+dropdown+'</ul>';
                  $("#dropdown-"+inputid).html(dropdown);
                  $("#dropdown-"+inputid+" li>a").on("click",function(){
                      var id=$(this).attr('data-id');
                      if (arrayinput[a[0]+'_'+a[1]].indexOf(id)==-1) {
                          arrayinput[a[0]+'_'+a[1]].push(id);
                          var value='{"'+arrayinput[a[0]+'_'+a[1]].join('","')+'"}';
                          $(elem).val(value);
                          $(elem).kotArrayInput('reload');
                      }
                  return false;    
                  });
                  var links=$(this).next().find("a");
                  $(links).on("click",function(i){
                        var id=$(this).parent().attr("data-id");
                        arrayinput[a[0]+'_'+a[1]].splice( arrayinput[a[0]+'_'+a[1]].indexOf(id),1);
                        var value='{"'+arrayinput[a[0]+'_'+a[1]].join('","')+'"}';
                        $(elem).val(value);
                        $(elem).kotArrayInput('reload');
                        return false;
                    });
      }
      
      
  };
  $.fn.kotArrayInput = function(method) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
    return false;
    } 
  };
})( jQuery );
