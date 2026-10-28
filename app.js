const bookingForm = document.getElementById("booking-form");
const bookingDate = document.getElementById("booking-date");
const confirmationSection = document.getElementById("confirmation-section");
const confirmationSummary = document.getElementById("confirmation-summary");
const toast = document.getElementById("toast");

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
bookingDate.min = localDateString(new Date());

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("vi-VN", {weekday:"long", day:"2-digit", month:"2-digit", year:"numeric"}).format(new Date(year, month - 1, day));
}

bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const booking = {
    name: String(data.get("name")).trim(),
    phone: String(data.get("phone")).trim(),
    date: data.get("date"),
    time: data.get("time"),
    guests: Number(data.get("guests")),
    area: data.get("area"),
    note: String(data.get("note")).trim(),
    status: "Chờ nhà hàng xác nhận",
    createdAt: new Date().toISOString()
  };
  if (!booking.name || !booking.phone || !booking.date || !booking.time) {
    showToast("Vui lòng điền đầy đủ thông tin bắt buộc.");
    return;
  }
  if (booking.date < localDateString(new Date())) {
    showToast("Vui lòng chọn ngày hôm nay hoặc ngày trong tương lai.");
    bookingDate.focus();
    return;
  }
  // Demo only: no data is sent to a restaurant or stored on a server.
  console.log("Yêu cầu đặt bàn demo:", booking);
  confirmationSummary.textContent = `${booking.name} · ${booking.phone} · ${formatDate(booking.date)} lúc ${booking.time} · ${booking.guests} khách · Không gian: ${booking.area}. ` + (booking.note ? `Ghi chú: ${booking.note}` : "Không có ghi chú.");
  confirmationSection.classList.remove("hidden");
  confirmationSection.scrollIntoView({behavior:"smooth", block:"center"});
  showToast("Đã tạo yêu cầu đặt bàn demo.");
  bookingForm.reset();
  bookingDate.min = localDateString(new Date());
});
document.getElementById("new-booking").addEventListener("click", () => {
  confirmationSection.classList.add("hidden");
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
});
