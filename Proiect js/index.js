toastr.options = {
  closeButton: false,
  debug: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
toastr["error"]("Error", "My error message");
toastr["info"]("Info", "My info message");
toastr["success"]("Success", "My Success message");
toastr["warning"]("Info", "My warning message");
