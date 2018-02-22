# FocusVision Survey Helper
Chrome extensions for Decipher survey programming/testing

These Scripts allow keyboard shortcuts to be added to navigate around surveys using the chrome web browser.  They also add an alternative to the ctrl+right arrow shortcut in order to better answer questions.
<br/>
<br/>
### Installation:<br/>
https://chrome.google.com/webstore/detail/focusvision-keyboard-shor/fkgbkflajagjddfdmjjbibceheebfdch
<br/>
<br/>
### Survey Shortcuts:
<ul>
    <li>shift+Right Arrow = Same as Ctrl right arrow but using the script to try to avoid terms and getting caught on validates. Works best when QA codes are on.  Should be able to fill autosums and select questions properly.  </li>
    <li>alt+g = This will try to take the survey for you auto answering each question. This can be cancelled by hitting escape. It will also time-out if it takes longer than 5 seconds for a page to load.</li>
    <li>alt+q = Go to the projects quota page</li>
    <li>alt+r = Go to the projects report page</li>
    <li>alt+p = Go to the project in portal</li>
    <li>alt+s = Go to the given question using start-at= So you can start from a certain question</li>
    <li>alt+h = Goes to given question using start-at=, stop-at=, &debug=flow So you can start from a certain question even if it has a condition</li>
    <li>alt+t = Start the survey from the beginning</li>
    <li>alt+w = Go to the SST page</li>
    <li>alt+v = Go to the version control page</li>
    <li>alt+d = Disable randomization on the current page</li>
    <li>alt+u = Go to survey upload manager</li>
    <li>alt+c = Go to Crosstabs</li>
    <li>alt+f = Put the survey in flow mode</li>
    <li>alt+(1-9) = Will Straighline the given column number for 2d radio questions</li>
    <li>shift+Up Arrow = Will click the continue button without answering the current page</li>
    <li>shift+Down Arrow = Will fill the current page with answers without clicking the continue button</li>
    <li>shift+alt+s = Opens a prompt with the current state link</li>
</ul>

### Quota Shortcuts:
<ul>
    <li>alt+e = Edit Quota if on the quota page</li>
    <li>tab = Edit the next item when in edit mode</li>
    <li>esc = Cancels edit mode</li>
</ul>

### Quota Buddy
This also adds a menu in the top left of quota pages to help navigate large quota sheets.

### Global Shortcuts(beta):

<ul>
    <li>alt+shift+p = Enables bookmark search</li>
</ul>
<br/>
Limitations:<br/>
Currently limited to surveys with specified cnames in your exentension. 
