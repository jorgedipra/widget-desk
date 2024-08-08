Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class Keyboard {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);
    public const byte VK_LWIN = 0x5B;
    public const byte VK_D = 0x44;
    public const uint KEYEVENTF_KEYUP = 0x0002;
    public const uint KEYEVENTF_KEYDOWN = 0x0000;

    public static void SendWinD() {
        // Simulate Win key down
        keybd_event(VK_LWIN, 0, KEYEVENTF_KEYDOWN, 0);
        // Simulate D key down
        keybd_event(VK_D, 0, KEYEVENTF_KEYDOWN, 0);
        // Simulate D key up
        keybd_event(VK_D, 0, KEYEVENTF_KEYUP, 0);
        // Simulate Win key up
        keybd_event(VK_LWIN, 0, KEYEVENTF_KEYUP, 0);
    }
}
"@
[Keyboard]::SendWinD()
