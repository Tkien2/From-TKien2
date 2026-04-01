# Cập nhật
### 1/4/2026

**Đã fix**
- Thư trả về undefined ở trang đầu tiên khi dùng mũi tên trở về trang trước
- Màu nền trang toàn màn hình ở mobile
- Logic javascript thừa

**Sự cố đã biết**
- Console một đống lỗi khi hiện bức thư
# Giới thiệu
Web này là quà tặng nho nhỏ cho 4 người bạn của tui vào ngày 20/10, code thì sơ sài nên... kệ đi ha.
# Quá trình
## Ý tưởng
Dự án nho nhỏ này thật ra bắt đầu vào tối 17/10/2025 (Thứ 6). Lúc này thì tui mới chốt quà là làm web, nhưng chỉ có 3 ngày để hoàn thiện thì tui mới suy nghĩ không biết liệu có làm kịp deadline không. Tui vốn code chậm, các dự án nhỏ trước đó mất hơn 1 tuần mới xong, đã vậy còn xấu nữa. Cuối cùng vẫn cố gắng nghĩ xem web trông như thế nào cho nhanh, hehe.

Lúc này thì tui dùng Ibis Paint để phác sơ ý tưởng web:

![Bản phác thảo đầu web đầu tiên](/Images/Sketch.jpg)
*Bản phác thảo đầu tiên*

Kkk, như mọi người thấy thì có mục số 4 và 5 thì web hiện tại (26/10/2025) là chưa có, lý do thì do không kịp thời gian thôi không có gì hết. Khi nào Kin rảnh thì thêm vào sau.

Ngoài ra thì còn có "BMG6: TNEOYAM?", cái này thật ra là Kin muốn chèn nhạc nền thôi, nhưng mà vẫn chưa kịp chèn, hehe.

## Khó khăn
Cái này thì ai cũng gặp rồi - bug. Chính nó, bug với error, lúc code thì chắc chắn gặp bug rồi. Ban đầu Kin code giao diện cho máy tính trước, nói chung thì web hoạt động khá trơn tru. Sau đó thì mới tối ưu cho điện thoại về giao diện, cỡ chữ,...

Đáng lẽ ra hôm 20/10 là Kin đã hoàn thành web trước 8h rồi, mà tại lúc test web trên mobile thì vấn đề khác xuất hiện. Trình duyệt trên mobile hoạt động hơi khác tí, nhát là cách cuộn web. Có 2 bug chính Kin phải giải quyết hôm ấy:

1. Chrome trên mobile chức năng cuộn hơi khác, khiến web gặp bug: Hiển thị nội dung khi chưa nhập mật khẩu.
2. Web trên mobile có thể thu phóng ra khỏi thẻ `<body>` (khung chính của web).

Tối hôm 20/10 Kin chỉ kịp fix bug số 2 bằng cách... nhờ ChatGPT (Kin vã lắm rồi mới phải đi nước này 😭🙏). Code Kin đã cố chèn để fix:

```html
<!-- File html, code của ChatGPT -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
```
```css
/* File css, code của ChatGPT + Kin */
html, body{
    overflow-x: hidden !important;
    position: relative;
}
```
```javascript
// File javascript, code của Kin
document.addEventListener("scroll", ()=>{
    if(window.scrollX > 0){
        window.scrollTo(0, window.scrollY)
    }
})
```

Khi bà mấy bà đọc được cái này thì cả 2 bug này được fix hết rồi nha!
# Lời kết
Phải nói là đây là dự án mà cá nhân Kin cảm thấy đẹp nhất rồi, chỉ trong 3 ngày mà Kin làm được như này là tốt lắm rồi. Giờ Kin chỉ đang tự hỏi xem web này tồn tại được bao lâu, hehe...