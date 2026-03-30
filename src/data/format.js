export function formatCurrency(value) {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

export function formatStatusTone(status) {
  if (status.includes("확정") || status.includes("완료")) {
    return "success";
  }
  if (status.includes("대기")) {
    return "pending";
  }
  return "default";
}
