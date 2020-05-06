(function init($){
// navigator
  var lnb = $('.nav'),
  header = $('.aside'),
  full_lnb = "full_lnb",
  openSubH = 277,
  closeSubH = 79,
  timer,
  delay = 300,
  mobileSize = 768;
  header.on({
    'mouseenter': function(){
      if(header.hasClass(full_lnb) || $(window).outerWidth() <= mobileSize){
        lnb.css('height','100%');
        return;
      }
      timer = setTimeout(function() {    
          lnb.animate({"height":openSubH});        
      }, delay)
    },
    'mouseleave': function(){
      if(header.hasClass(full_lnb) || $(window).outerWidth() <= mobileSize){
        lnb.css('height', closeSubH);
        return;
      } 
      clearTimeout(timer);
      lnb.stop();
      lnb.animate({"height":closeSubH});
    }
  });

  $('[toggle_nav]').on('click',function(){
    header.toggleClass(full_lnb);
    (header.hasClass(full_lnb))?$('body').css("overflow","hidden"):$('body').css("overflow","visible")
  })
  var myIpt = $('[myInfoIpt]'),
      myInfoLayer = $('[myInfoLayer]');
  $('[myInfo]').on({
    'mouseenter' : function(){
      if($('.my_infoDtl').hasClass('open')) return;
      myInfoLayer.addClass('open');
    },
    'mouseleave' : function(){
      myInfoLayer.removeClass('open');
    },    
    'focusout' : function(){
      myInfoLayer.removeClass('open');
    }
  })
  myIpt.on('click',function(){
    myInfoLayer.removeClass('open');
    $('.my_infoDtl').toggleClass('open');
  })
  $('[myIptClose]').on('click',function(){
    myInfoLayer.removeClass('open');
    $('.my_infoDtl').removeClass('open');
  })

	/* layer_popup */
  var modal= $( "[dataformat='modal']" ),
      layer_pop = $(".pop_wrap");
  modal.draggable({
    handle: ".pop_header",
    cursor: "move",
    containment: "parent",
    scroll:false
  });
  layer_pop.find("[role='btn_close']").on('click',function(e){
    e.preventDefault();      
    var selp = $(this);
    (selp.parents('.overlay').length) ?
    selp.parents('.overlay').hide() : selp.parents('.pop_wrap').slideUp();
    selp.parents('.pop_wrap').css({left:'50%',top:'120px'});
    objHtml.css('overflow','auto');
  });
      
  var rolePopOpen =$("[openpop]"),
      objHtml = $('html');
  rolePopOpen.on('click',function(e){
    e.preventDefault();
    var popOverlay = $('#'+$(this).attr('openpop'));
    if(popOverlay.css('display') == 'none'){
      objHtml.css('overflow','hidden');
      popOverlay.slideDown(300);
    }else{
      objHtml.css('overflow','auto');
    }
    popOverlay.attr('tabindex',-1).focus();
  });

  /* fileDeco */
  function fileNameInput(){
    var fName=$('#file').val().split('\\');
    $('#file_name').val($(fName)[2]);
  }

  /*calendar*/
  // $.datepicker.setDefaults({
  //   buttonImageOnly: true,
  //   showOn: "both",
  //   buttonImage: "../img/btn_calendar.gif",
  //   changeMonth: true,
  //   changeYear: true,
  //   numberOfMonths: 1,
  //   regional : ["ko"],
  //   dateFormat : "yy-mm-dd"
  // });
  // $( "[dataformat='datepic']" ).datepicker({
  //     buttonText: "날짜를 선택해주세요."
  //   });
  // var from = $( "[dataformat='from']" ).datepicker({
  //   buttonText: "시작날짜를 선택해주세요.",
  //   onClose: function( selectedDate ) {
  //     var getName=$(this).attr('name');
  //     $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
  //   }  
  // });
  // var to = $( "[dataformat='to']" ).datepicker({
  //   buttonText: "종료날짜를 선택해주세요.",
  //   onClose: function( selectedDate ) {
  //     var getName=$(this).attr('name');
  //     $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
  //   }
	// });
	// function date_to_str(format){
  //   var year = format.getFullYear(),
  //       month = format.getMonth() + 1,
  //       date = format.getDate(),
  //       hour = format.getHours(),
  //       min = format.getMinutes(),
  //       sec = format.getSeconds(),
  //       ampm = (hour >= 12) ? '오후' : '오전';
  //   if(month<10) month = '0' + month;
  //   if(date<10) date = '0' + date;
  //   hour = hour % 12;
  //   hour = hour ? hour : 12;
  //   if(hour<10) hour = '0' + hour;
  //   min = min < 10 ? '0'+min : min;
  //   sec = sec < 10 ? '0'+sec : sec;

  //   return year + "-" + month + "-" + date + " " + ampm + " " + hour + ":" + min + ":" + sec;
	// }
	// $('[dataformat="datetimepic"]').val( date_to_str(new Date()));
	// use jqueryui-timepicker-addon
  // https://trentrichardson.com/examples/timepicker/
  // $("[dataformat='datetimepic']").datetimepicker({
  //   timeFormat: 'tt hh:mm:ss',
  //   controlType: 'select',
  //   oneLine: true
  // });

})(jQuery);

var tabBtn = $('.tab_list > li'),
    tab_cont = $('.tab_conts > .tab_cont');
tab_cont.hide().eq(0).show();
tabBtn.on('click',function(e){
  e.preventDefault();
  var cur = $(this).index(),
      thisCont =  $(this).parents('.tab').next('.tab_conts');
      tabBtn.removeClass('on');
      $(this).addClass('on');
      tab_cont.hide();
  thisCont.children('.tab_cont').eq(cur).show();  
})

// slectlist evt
  var selList = $('[role="checklist"]'),
      selBtn = selList.find('input'),
      allBtn = $('[role="all"]');    
  selBtn.each(function(){
    if($(this).prop('checked')) $(this).parent('label').addClass('on');
  });
  selBtn.on('change', function(){
    var sel = $(this),
        selP = sel.parents('ul');
      addOn(sel);
      allEvt(selP);
  });
  allBtn.on('change',function(){
    var all = $(this);
    addOn(all);
  })
  function addOn(sel){
    if(sel[0].type === 'radio'){
      sel.parents('ul').find('label').removeClass('on');
    }
    (sel.prop('checked')) ?
      sel.parents('label').addClass('on') :
      sel.parents('label').removeClass('on');
  }
  function allEvt(selP){
    var checkLeng = selP.find(':checkbox:checked').length,
        allLeng = selP.find(':checkbox').length,
        thisAll = selP.prev('label').find('[role="all"]');       
    (checkLeng === allLeng) ?
    thisAll.prop('checked',true).parents('label').addClass('on') :
    thisAll.prop('checked',false).parents('label').removeClass('on');
  }
  allBtn.on('change',function(){
    var sel = $(this),
        selUl = $(this).parent('label').next('ul'),
        selTxt = $(this).next('.txt');
    if(sel.prop('checked')){
      selUl.find(':checkbox').prop('checked',true);
      selUl.find('label').addClass('on');
      selTxt.text('ON')
    }else{
      selUl.find(':checkbox').prop('checked',false);
      selUl.find('label').removeClass('on');
      selTxt.text('OFF')
    }
  });
  
  // 토글 on,off
	$("[dataformat='toggle']").on('click',function(e){
		e.preventDefault();
		var cur = $(this).attr('datavalue');
		if($(this).attr('disabled') == 'disabled') return false;
		if(cur == 'on'){
      $(this).attr('datavalue','off');
      $(this).children('input').attr('title',"꺼짐");
		}else{
      $(this).attr('datavalue','on');
      $(this).children('input').attr('title',"켜짐");
		}
  })
  
var tblTabIdx = $('.tbl_hover').find('tr');
tblTabIdx.each(function(i, el){
  var item = $(this);
  item.prop('tabindex',0);
})

$('.btn_top').on('click',function(e){  
  e.preventDefault();
  alert('dd');
  $('html, body').animate({scrollTop: '0'}, 500);
})