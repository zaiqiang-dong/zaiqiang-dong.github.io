import{_ as n,o as a,c as l,a as p}from"./app.5f21f102.js";const d=JSON.parse('{"title":"Android watchdog","description":"","frontmatter":{},"headers":[],"relativePath":"android/watchdog/uml-class.md"}'),e={name:"android/watchdog/uml-class.md"};function r(c,s,o,i,t,F){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="android-watchdog" tabindex="-1">Android watchdog <a class="header-anchor" href="#android-watchdog" aria-hidden="true">#</a></h1><div class="language-@startuml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">@startuml</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">@startuml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class Runnable {</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class Thread {</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">interface Monitor {</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">HandlerChecker o- Monitor</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class BinderThreadMonitor {</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">Monitor&lt;|--BinderThreadMonitor</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class Watchdog {</span></span>
<span class="line"><span style="color:#F8F8F2;">    -Watchdog sWatchdog</span></span>
<span class="line"><span style="color:#F8F8F2;">    -ArrayList&lt;HandlerChecker&gt; mHandlerCheckers</span></span>
<span class="line"><span style="color:#F8F8F2;">    -HandlerChecker mMonitorChecker</span></span>
<span class="line"><span style="color:#F8F8F2;">    -ActivityManagerService mActivity</span></span>
<span class="line"><span style="color:#F8F8F2;">    -IActivityController mController</span></span>
<span class="line"><span style="color:#F8F8F2;">    -boolean mAllowRestart = true</span></span>
<span class="line"><span style="color:#F8F8F2;">    -OpenFdMonitor mOpenFdMonitor</span></span>
<span class="line"><span style="color:#F8F8F2;">    -Watchdog()</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void init(Context context, ActivityManagerService activity)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void run()</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void processStarted(String processName, int pid)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void addMonitor(Monitor monitor)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void addThread(Handler thread)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void addThread(Handler thread, long timeoutMillis)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void setActivityController(IActivityController controller)</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">Thread&lt;|--Watchdog</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">Watchdog o- HandlerChecker</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class HandlerChecker {</span></span>
<span class="line"><span style="color:#F8F8F2;">    -Handler mHandler</span></span>
<span class="line"><span style="color:#F8F8F2;">    -String mName</span></span>
<span class="line"><span style="color:#F8F8F2;">    -long mWaitMax</span></span>
<span class="line"><span style="color:#F8F8F2;">    -ArrayList&lt;Monitor&gt; mMonitors</span></span>
<span class="line"><span style="color:#F8F8F2;">    -ArrayList&lt;Monitor&gt; mMonitorQueue</span></span>
<span class="line"><span style="color:#F8F8F2;">    -Monitor mCurrentMonitor</span></span>
<span class="line"><span style="color:#F8F8F2;">    -long mStartTime</span></span>
<span class="line"><span style="color:#F8F8F2;">    +scheduleCheckLocked()</span></span>
<span class="line"><span style="color:#F8F8F2;">    +addMonitorLocked(Monitor monitor)</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void scheduleCheckLocked()</span></span>
<span class="line"><span style="color:#F8F8F2;">    +void run()</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">Runnable&lt;|--HandlerChecker</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@enduml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div>`,2)]))}const m=n(e,[["render",r]]);export{d as __pageData,m as default};
