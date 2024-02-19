layui.use(function(){
  var layer = layui.layer;
  var form = layui.form;
  var laydate = layui.laydate;
  var util = layui.util;
  
  // 欢迎信息
  layer.msg('Hello World', {icon: 6});
  
  // 输出版本号
  lay('#version').html(layui.v);
  
  // 日期
  laydate.render({
    elem: '#test2',
    value: new Date(),
    isInitValue: true
  });
  
  // 触发事件
  util.on('test-active', {
    'test-form': function(){
      layer.open({
        type: 1,
        resize: false,
        shadeClose: true,
        area: '350px',
        title: 'layer + form',
        content: ['<ul class="layui-form layui-form-pane" style="margin: 15px;">',
          '<li class="layui-form-item">',
            '<label class="layui-form-label">输入框</label>',
            '<div class="layui-input-block">',
              '<input class="layui-input" lay-verify="required" name="field1">',
            '</div>',
          '</li>',
          '<li class="layui-form-item">',
            '<label class="layui-form-label">选择框</label>',
            '<div class="layui-input-block">',
              '<select name="field2">',
                '<option value="A">A</option>',
                '<option value="B">B</option>',
              '<select>',
            '</div>',
          '</li>',
          '<li class="layui-form-item" style="text-align:center;">',
            '<button type="submit" lay-submit lay-filter="*" class="layui-btn">提交</button>',
          '</li>',
        '</ul>'].join(''),
        success: function(layero, index){
          layero.find('.layui-layer-content').css('overflow', 'visible');
          
          form.render().on('submit(*)', function(data){
            var field = data.field;
            
            // 显示填写的表单
            layer.msg(util.escape(JSON.stringify(field)), {
              icon: 1
            });
            // layer.close(index); //关闭层
          });
        }
      });
    }
  });
});
