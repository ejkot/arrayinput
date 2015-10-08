/* @name jquery plugin for arrayinput yii2 widget asset
 * @Author ejkot
 */
(function( $ ){
var arrayinput=[];
  var methods={
      init : function(options) {
/* Параметры */
          options=$.extend({
                ajaxurl : null,
                list : new Array,
                minlength : 3,
                beforeaddcallback : function (id,name) {return true;}
          },options);
          if (options.list==false || options.list==null) options.list=new Array;
         // if (Array.isArray(options.list)!=true) {options.list=new Array;}
          $(this).each(function(){
              var inputid=$(this).attr('id');
              var inputval=$(this).val().replace(/[^0-9A-Za-z,-]/g,"");
              /* Получаем массив id-значений поля из строки атрибута value*/
              if (inputval!='') var inputarr=inputval.split(","); else {
                  var inputarr=[];
                  $(this).val('{}');
              }
              var a=inputid.split('-');
              arrayinput[a[0]+'_'+a[1]]=inputarr;
              $(this).attr('type','hidden');
              $(this).kotArrayInput('reload',options);
          });         
      },
      reload : function(options) {
                  var inputid=$(this).attr('id');
                  var elem=$(this);
                  /* Достаем имя формы и имя поля из id поля*/
                  var a=inputid.split('-');           
                  var inputarr=arrayinput[a[0]+'_'+a[1]];
                  /* Достанем массив текстовых описаний каждого значения */
                  /* добавим в список элементы */
                  var content='';
                  $.each(inputarr,function(i,val){
                     if (val.length!="") content+="<li class='btn btn-default' data-id='"+val+"'>"+options.list[val]+"&nbsp;&nbsp;<a class='glyphicon glyphicon-remove'> </a></li>";
                  });
                  $("#items-"+inputid).html(content);
                  if (!options.ajaxurl) {
/*  Формируем выпадающий список из параметра list, если не передан ajaxurl */
                        var dropdown='';        
                        $.each(options.list,function(i,val){
                             var dataid=i.trim();
                            dropdown+='<li class="'+((arrayinput[a[0]+'_'+a[1]].indexOf(i)===-1) ? '' : 'disabled')+'"><a href="#" data-id="'+dataid+'">'+val+'</a></li>';
                        });
                        dropdown='<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Добавить<span class="caret"></span></button><ul class="dropdown-menu">'+dropdown+'</ul>';
                        $("#dropdown-"+inputid).html(dropdown);
                        $("#dropdown-"+inputid+" li>a").on("click",function(){
                          var id=$(this).attr('data-id');
                          var val=$(this).html();
                          if (options.beforeaddcallback(id,val)===true) {   
                            if (arrayinput[a[0]+'_'+a[1]].indexOf(id)==-1) {
                                  arrayinput[a[0]+'_'+a[1]].push(id);
                             var value='{"'+arrayinput[a[0]+'_'+a[1]].join('","')+'"}';
                                $(elem).val(value);
                                $(elem).kotArrayInput('reload',options);
                            }
                          }
                     return false;    
                     });
                  } else {
/* Если передан ajaxurl, формируем поле для автозаполнения */
                  var autoinput='';
                  autoinput ='<div class="input-group"><input type="text" id="inputcontrol-'+inputid+'" class="form-control" data-id="" autocomplete="off">';
                  autoinput+='<div class="input-group-btn"><button class="btn btn-primary pull-right" id="inputbutton-'+inputid+'"><span class="glyphicon glyphicon-plus"></span></button></div></div>';
                  autoinput+='<ul class="dropdown-menu" role="menu" id="inputlist-'+inputid+'"></ul>';
                  
                  $("#autoinput-"+inputid).html(autoinput);
                  $("#inputcontrol-"+inputid).on('keyup',function(){
                        $("#inputlist-"+inputid).css('display','none');
                        var val=$(this).val();
                        if (val.length>=options.minlength) {
                                $.get(
                                options.ajaxurl,
                                {"q" : val},
                                function(data) {
                                    var html='';
                                    $.each(data,function(i,val) {            
                                        html+='<li class="'+((arrayinput[a[0]+'_'+a[1]].indexOf(val.id)===-1) ? '' : 'disabled')+'"><a href="#" tabindex="-1" data-id="'+val.id+'" data-shortname="'+val.short_name+'">'+val.full_name+'</a></li>';
                                    });
                                    $("#inputlist-"+inputid).html(html).css('display','block');
                                    $("#inputlist-"+inputid+">li>a").on('click',function(){
                                        var data=$(this).attr('data-id');
                                        var val=$(this).attr('data-shortname');
                                        $("#inputcontrol-"+inputid).val(val);
                                        $("#inputcontrol-"+inputid).attr('data-id',data);
                                        return false;
                                        });
                                        return false;
                                }    
                                );
                            }
                        });
                        
                        $("#inputbutton-"+inputid).on('click',function(){
                            var id=$("#inputcontrol-"+inputid).attr('data-id');
                            var val=$("#inputcontrol-"+inputid).val();
                            if (options.beforeaddcallback(id,val)===true) {
                                if (id && arrayinput[a[0]+'_'+a[1]].indexOf(id)==-1) {
                                    arrayinput[a[0]+'_'+a[1]].push(id);
                                    var value='{"'+arrayinput[a[0]+'_'+a[1]].join('","')+'"}';
                                    $(elem).val(value);
                                    options.list[id]=val;
                                    $(elem).kotArrayInput('reload',options);
                                    }
                            }
                                    return false;
                                });
                        
                  }
 /* Удаление элементов из списка */                 
                  var links=$(this).next().find("a");
                  $(links).on("click",function(i){
                       var id=$(this).parent().attr("data-id");
                       arrayinput[a[0]+'_'+a[1]].splice( arrayinput[a[0]+'_'+a[1]].indexOf(id),1);
                       var value='{"'+arrayinput[a[0]+'_'+a[1]].join('","')+'"}';
                       $(elem).val(value);
                       $(elem).kotArrayInput('reload',options);
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
