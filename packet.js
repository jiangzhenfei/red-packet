function Packet(){
    this.init()
}
Packet.prototype.init = function(){
    this.id = Math.random()
    this.createDiv()
    this.randomLeft()
}
//创建div
Packet.prototype.createDiv = function(){
    this.el = document.createElement('div')
    this.addClick(this.el)
    this.el.className = 'packet'
    document.getElementById('container').appendChild(this.el)
    this.animate(5000)//毫秒数
}
//给红包对象随机left
Packet.prototype.randomLeft = function(){
    let allWidth = document.getElementById('container').offsetWidth - 50;//纵向移动距离
    var left = Math.random() * allWidth;
    this.el.style.left = left+'px'
}
//给红包对象添加点击事件
Packet.prototype.addClick = function(el){
    var self = this;
    el.addEventListener('click',function(){
        if(self.id>0.5){
            console.log('中奖')
        }else{
            console.log('不中奖')
        }
    })
}
//红包运动，参数为运动到底部需要的时间
Packet.prototype.animate = function(duration){
    this.startTime = +new Date;//记录现在的开始时间
    this.startPos = 0;
    this.propertyName = 'top'
    this.endPos = document.getElementById('container').offsetHeight;//得到目标位置（传）
    this.duration = duration;//得到需要的时间（传）
    this.easing = function(t, b, c, d){
        return c * t / d + b;
    }
    var self = this;
    var timeId = setInterval(function(){
        //如果self返回false，则取消定时器
        if( self.step()=== false ) {
            clearInterval( timeId )
            //销毁
            document.getElementById('container').removeChild(self.el)
            self = null
        }
    },19)
}
Packet.prototype.step = function(){
    //目前的时间
    var t = +new Date;
    //如果时间超过开始时间和需要时间之和，则矫正目前的位置为目标位置
    if( t >= this.startTime + this.duration ) {
        this.update( this.endPos )
        return false;//返回false为了取消定时器
    }
    var pos = this.easing( t - this.startTime, this.startPos, this.endPos-this.startPos ,this.duration)
    this.update( pos )
}
//更新当前位置
Packet.prototype.update = function( pos ){
    this.el.style[ this.propertyName ] = pos + 'px'
}




setInterval(function(){
    new Packet()
},1000)