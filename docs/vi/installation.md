# Vencord (DEV Build)
## Windows
### 1. Yêu cầu

- Phiên bản bạn đang sử dụng là **Vencord DEV Build**. Nếu bạn không biết cách cài đặt, bạn có thể [nhấp vào đây](https://docs.vencord.dev/installing/) để đọc hướng dẫn cài đặt.
<details closed>
<summary>Video hướng dẫn cài đặt Vencord DEV</summary>
<br>

- Video hướng dẫn cài đặt Vencord DEV Build bởi [@daveyy1](https://discordappuser.com/users/549244932213309442): _Nhấp vào hình ảnh dưới đây để xem hướng dẫn_

[![Hướng dẫn cài đặt Plugin bên thứ ba](https://camo.githubusercontent.com/e30590c30a822b3a19fcba0e92cddb3b62aa1b09ac1a10e1958415e26d397090/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f387765786a536f38664e772f6d617872657364656661756c742e6a7067)](https://www.youtube.com/watch?v=8wexjSo8fNw)

</details>

### 2. Cài đặt Plugin

Mở **Windows Explorer** và chọn đường dẫn nơi bạn đã cài đặt **Vencord** và nhấp vào thư mục `src`. Trong thư mục bạn vừa nhấp, tạo một thư mục mới tên là `userplugins` _(nếu bạn đã có thư mục đó, bạn có thể bỏ qua bước tạo thư mục `userplugins`)_.

- Trong thư mục `userplugins`, nhấp vào thanh địa chỉ và gõ **cmd** và nhấn **enter**.

Trong **Command Prompt** sử dụng lệnh này:

```shell
git clone https://github.com/gujarathisampath/fakeProfile.git
```

Sau khi gõ dòng lệnh, chờ đến khi tải xuống hoàn tất và sau đó gõ:

```shell
pnpm build
```

- Inject Vencord vào Discord (Nếu bạn sử dụng Vesktop hoặc extension build thì có thể bỏ qua bước này):

```shell
pnpm inject
```

Và đó là tất cả. Bây giờ bạn có thể khởi động lại Discord và kiểm tra **fakeProfile** trong cài đặt **Plugins**.

### 3. Cách cập nhật plugin fakeProfile?

- Đi đến `Vencord\src\userplugins\fakeProfile` trong thanh địa chỉ gõ **cmd** và nhấp vào **Command Prompt** gõ:

```shell
git pull
```

- Sau đó gõ:

```shell
pnpm build
```

Đó là tất cả. Khởi động lại client Discord của bạn và tận hưởng.

## Linux

### Sử dụng lệnh
- Bạn có thể cài đặt fakeProfile và Vencord DEV Build ở dòng lệnh dưới đây:
```shell
curl -o- 'https://raw.githubusercontent.com/ExtbhiteEAS/fakeProfile/refs/heads/main/assets/fpInstaller.sh' | bash
```

### Cách thủ công
> [!CAUTION]
> Bạn cần cài đặt các thư viện như `git nodejs npm` để làm việc này.

- Bạn có thể cài đặt fakeProfile và Vencord DEV Build thông qua lệnh thủ công:
```shell
git clone https://github.com/Vendicated/Vencord.git
cd Vencord/ && sudo npm i -g pnpm && pnpm i
cd src/ && mkdir userplugins
cd userplugins/ && git clone https://github.com/gujarathisampath/fakeProfile.git && pnpm build
```

- Sau các lệnh thủ công đó thì bạn đã cài đặt thành công Vencord DEV Build với fakeProfile tuy nhiên để khởi động thủ công thì bạn cần nhập lệnh `pnpm start`.

## Extension (Tiện ích mở rộng)
- Tham gia [Discord](https://discord.gg/ffmkewQ4R7) của chúng tôi và tìm kênh `#install-and-info` để lấy extension cho trình duyệt của bạn.

## Bunny (Pyoncord)

> [!NOTE]
> Vào ngày 29/04/2025, Bunny đã dừng hỗ trợ và không hoạt động. URL plugin dành cho Bunny hiện tại đã bị hỏng. Bây giờ việc cài đặt dành cho Android có thể tìm thấy ở trong server Discord, sẽ có một số thông tin cần thiết để giúp bạn cài đặt. **Sử dụng bất kỳ bản fork nào của client Vendetta**

## Emnity

> [!NOTE]
> Chúng tôi không biết gì về cái này. Nếu bạn biết, hãy làm issue về vấn đề này.
> Hoặc sử dụng các client giống như Revange hoặc Vetta có hỗ trợ cho iOS.