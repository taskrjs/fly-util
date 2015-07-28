import updateNotifier from "update-notifier"
/**
  update-notifier wrapper.
  @param {Array} options
*/
export function notifyUpdates (options) {
  updateNotifier(options).notify()
}
