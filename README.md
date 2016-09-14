# decipher-chrome-extensions
Chrome extensions for Decipher survey programming/testing

These Scripts allow keyboard shortcuts to be added to navigate around surveys using the chrome web browser.  They also add an alternative to the ctrl+right arrow shortcut in order to better answer questions.
<br/>
<br/>
Installation:<br/>
TBD
<br/>
<br/>
Shortcuts
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
<li>alt+v = Go to the Version control page</li>
<li>alt+d = Disable randomization on the current page</li>
<li>alt+number = Will Straighline the given column number for 2d radio questions</li>
<li>shift+Up Arrow = Will click the continue button without answering the current page</li>
<li>shift+Down Arrow = Will fill the current page with answers without clicking the continue button</li>
</ul>

QUOTAS<br/>
This also adds some functionality to the quotas page to make it easier to edit cells by entering the new values and pressing tab to move to the next available cell.  Escape will cancel the current cell edit and either tab or enter will save the select cell edit.  
<br/>
Limitations:<br/>
Currently limited to surveys in selfserve directories<br/>
Does not work with atm1d style questions
