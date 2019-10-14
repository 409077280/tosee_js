

// exports.install = function (Vue, options) {
//     Vue.prototype.unixTimeToDateTime = (unixTime)=>{
//         var checkHour = function (m) {
//             return m<10?'0'+m:m;
//         };
//         var time = new Date(unixTime * 1000);
//         var y = time.getFullYear();
//         var m = time.getMonth()+1;
//         var d = time.getDate();
//         var h = time.getHours();
//         var mm = time.getMinutes();
//         var s = time.getSeconds();
//         return y+'-'+checkHour(m)+'-'+checkHour(d)+' '+checkHour(h)+':'+checkHour(mm)+':'+checkHour(s);
//     };

// };

export default {
    unixTimeToDateTime(unixTime){
        var checkHour = function (m) {
            return m<10?'0'+m:m;
        };
        var time = new Date(unixTime * 1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+checkHour(m)+'-'+checkHour(d)+' '+checkHour(h)+':'+checkHour(mm)+':'+checkHour(s);
    }
}