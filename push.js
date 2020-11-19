//simpan key
// {"publicKey":"BPjDy9zurdxeJR7vYLskg9aukwZOjOn-qzQ0IADWzVCz61NlTXjrmtt15saO7gCMZ8y5qNATG79SMPWDANtPkzA",
// "privateKey":"TNHb2Egi2Ng1kOsl4YPKtAN15zqK0zF2uMM6DsIYnv0"}
var webPush = require('web-push')

const vapidKeys = {
  publicKey:
    'BPjDy9zurdxeJR7vYLskg9aukwZOjOn-qzQ0IADWzVCz61NlTXjrmtt15saO7gCMZ8y5qNATG79SMPWDANtPkzA',
  privateKey: 'TNHb2Egi2Ng1kOsl4YPKtAN15zqK0zF2uMM6DsIYnv0',
}

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/dpQW9fjHzSQ:APA91bEvilH6Hp8bEO7IY6dtQqUres7-_lmCWoNUxg1Z-spHTui6cXdEyMmDRHMNtdHivv6NDNKtUiHghp2P3VDXs9dRmBXOLc_IzM2_yl_VwhZ_Gu1wJTtAytuCxN7E-Vv-y-wRE3Gq',
  keys: {
    p256dh:
      'BE1GBikp97neQQrVGR0AgtElVgrGhIP9mmAZV7cDzaVsd8clDlYB7sexemNe4P+QhWfDniOqHM6EX/If04fLVJM=',
    auth: '9dE1IcEs0Vo+6X3t/dX4eg==',
  },
}
var payload = 'Selamat! Aplikasi sudah dapat menerima push notifikasi!'

var options = {
  gcmAPIKey: '423070503770',
  TTL: 60,
}
webPush.sendNotification(pushSubscription, payload, options)
