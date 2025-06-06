import{_ as n,o as a,c as l,a as p}from"./app.e4bc20d0.js";const d=JSON.parse('{"title":"问题","description":"","frontmatter":{},"headers":[{"level":2,"title":"技术问题","slug":"技术问题","link":"#技术问题","children":[]},{"level":2,"title":"配置问题","slug":"配置问题","link":"#配置问题","children":[]},{"level":2,"title":"待写文章","slug":"待写文章","link":"#待写文章","children":[]}],"relativePath":"todo.md"}'),e={name:"todo.md"};function t(r,s,c,i,o,F){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-hidden="true">#</a></h1><h2 id="技术问题" tabindex="-1">技术问题 <a class="header-anchor" href="#技术问题" aria-hidden="true">#</a></h2><table><thead><tr><th>问题</th><th>状态(1.未开始 2.进行中 3.已完成)</th><th>备注</th></tr></thead><tbody><tr><td>kconfig问题</td><td></td><td></td></tr><tr><td>cgroup</td><td></td><td></td></tr><tr><td>netlink kmod uevent</td><td></td><td></td></tr></tbody></table><h2 id="配置问题" tabindex="-1">配置问题 <a class="header-anchor" href="#配置问题" aria-hidden="true">#</a></h2><table><thead><tr><th>问题</th><th>状态(1.未开始 2.进行中 3.已完成)</th><th>备注</th></tr></thead><tbody><tr><td>docker windows</td><td></td><td></td></tr><tr><td>vim 英语提示kd, 无道词典</td><td></td><td></td></tr><tr><td>vim clang 方式gr显示引用不全</td><td></td><td></td></tr><tr><td>从timeminal 复制到feishu 粘贴发送</td><td></td><td></td></tr><tr><td>kernel dmesg与串口输出</td><td></td><td></td></tr><tr><td>中断再总结</td><td></td><td></td></tr><tr><td>android cgroup</td><td></td><td></td></tr><tr><td>快速定位crash的行</td><td></td><td></td></tr></tbody></table><h2 id="待写文章" tabindex="-1">待写文章 <a class="header-anchor" href="#待写文章" aria-hidden="true">#</a></h2><table><thead><tr><th>文章</th><th>状态(1.未开始 2.进行中 3.已完成)</th><th>备注</th></tr></thead><tbody><tr><td></td><td></td><td></td></tr></tbody></table><div class="language-puml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">puml</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">@startuml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">abstract class AbstractList</span></span>
<span class="line"><span style="color:#F8F8F2;">abstract AbstractCollection</span></span>
<span class="line"><span style="color:#F8F8F2;">interface List</span></span>
<span class="line"><span style="color:#F8F8F2;">interface Collection</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">List &lt;|-- AbstractList</span></span>
<span class="line"><span style="color:#F8F8F2;">Collection &lt;|-- AbstractCollection</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">Collection &lt;|- List</span></span>
<span class="line"><span style="color:#F8F8F2;">AbstractCollection &lt;|- AbstractList</span></span>
<span class="line"><span style="color:#F8F8F2;">AbstractList &lt;|-- ArrayList</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class ArrayList {</span></span>
<span class="line"><span style="color:#F8F8F2;">  Object[] elementData</span></span>
<span class="line"><span style="color:#F8F8F2;">  size()</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">enum TimeUnit {</span></span>
<span class="line"><span style="color:#F8F8F2;">  DAYS</span></span>
<span class="line"><span style="color:#F8F8F2;">  HOURS</span></span>
<span class="line"><span style="color:#F8F8F2;">  MINUTES</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">annotation SuppressWarnings</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@enduml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@startuml</span></span>
<span class="line"><span style="color:#F8F8F2;">start</span></span>
<span class="line"><span style="color:#F8F8F2;">if (condition A) then (yes)</span></span>
<span class="line"><span style="color:#F8F8F2;">  :Text 1;</span></span>
<span class="line"><span style="color:#F8F8F2;">elseif (condition B) then (yes)</span></span>
<span class="line"><span style="color:#F8F8F2;">  :Text 2;</span></span>
<span class="line"><span style="color:#F8F8F2;">  stop</span></span>
<span class="line"><span style="color:#F8F8F2;">(no) elseif (condition C) then (yes)</span></span>
<span class="line"><span style="color:#F8F8F2;">  :Text 3;</span></span>
<span class="line"><span style="color:#F8F8F2;">(no) elseif (condition D) then (yes)</span></span>
<span class="line"><span style="color:#F8F8F2;">  :Text 4;</span></span>
<span class="line"><span style="color:#F8F8F2;">else (nothing)</span></span>
<span class="line"><span style="color:#F8F8F2;">  :Text else;</span></span>
<span class="line"><span style="color:#F8F8F2;">endif</span></span>
<span class="line"><span style="color:#F8F8F2;">stop</span></span>
<span class="line"><span style="color:#F8F8F2;">@enduml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@startuml</span></span>
<span class="line"><span style="color:#F8F8F2;">clock   &quot;Clock_0&quot;   as C0 with period 50</span></span>
<span class="line"><span style="color:#F8F8F2;">clock   &quot;Clock_1&quot;   as C1 with period 50 pulse 15 offset 10</span></span>
<span class="line"><span style="color:#F8F8F2;">binary  &quot;Binary&quot;  as B</span></span>
<span class="line"><span style="color:#F8F8F2;">concise &quot;Concise&quot; as C</span></span>
<span class="line"><span style="color:#F8F8F2;">robust  &quot;Robust&quot;  as R</span></span>
<span class="line"><span style="color:#F8F8F2;">analog  &quot;Analog&quot;  as A</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@0</span></span>
<span class="line"><span style="color:#F8F8F2;">C is Idle</span></span>
<span class="line"><span style="color:#F8F8F2;">R is Idle</span></span>
<span class="line"><span style="color:#F8F8F2;">A is 0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@100</span></span>
<span class="line"><span style="color:#F8F8F2;">B is high</span></span>
<span class="line"><span style="color:#F8F8F2;">C is Waiting</span></span>
<span class="line"><span style="color:#F8F8F2;">R is Processing</span></span>
<span class="line"><span style="color:#F8F8F2;">A is 3</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">@300</span></span>
<span class="line"><span style="color:#F8F8F2;">R is Waiting</span></span>
<span class="line"><span style="color:#F8F8F2;">A is 1</span></span>
<span class="line"><span style="color:#F8F8F2;">@enduml</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div>`,8)]))}const u=n(e,[["render",t]]);export{d as __pageData,u as default};
