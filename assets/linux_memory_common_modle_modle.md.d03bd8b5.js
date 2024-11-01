import{_ as e,r as l,o as p,c as o,a as r,b as t}from"./app.a2daf185.js";const i="/assets/Slide1.512b1ddc.png",c="/assets/Slide2.ac549ed1.png",F="/assets/Slide3.ae39bcb6.png",_=JSON.parse('{"title":"内存模型","description":"","frontmatter":{},"headers":[{"level":2,"title":"0 概述","slug":"_0-概述","link":"#_0-概述","children":[]},{"level":2,"title":"1 FLATMEM 模型","slug":"_1-flatmem-模型","link":"#_1-flatmem-模型","children":[]},{"level":2,"title":"2 DISCONTIGMEM 模型","slug":"_2-discontigmem-模型","link":"#_2-discontigmem-模型","children":[]},{"level":2,"title":"3 SPARSEMEM 模型","slug":"_3-sparsemem-模型","link":"#_3-sparsemem-模型","children":[]},{"level":2,"title":"4 ARM64 内存模型","slug":"_4-arm64-内存模型","link":"#_4-arm64-内存模型","children":[]}],"relativePath":"linux/memory/common/modle/modle.md"}'),m={name:"linux/memory/common/modle/modle.md"};function u(n,s,b,d,M,h){const a=l("Vssue");return p(),o("div",null,[s[0]||(s[0]=r('<h1 id="内存模型" tabindex="-1">内存模型 <a class="header-anchor" href="#内存模型" aria-hidden="true">#</a></h1><hr><table><thead><tr><th>软件版本</th><th>硬件版本</th><th>更新内容</th></tr></thead><tbody><tr><td>linux 4.14</td><td>arm64</td><td>first</td></tr></tbody></table><hr><h2 id="_0-概述" tabindex="-1">0 概述 <a class="header-anchor" href="#_0-概述" aria-hidden="true">#</a></h2><p>系统中的物理内存可以用不同的方式处理。最简单的情况是，物理内存从地址0开始，跨越一个连续的范围，直到最大地址。但是，这个范围可能包含CPU无法访问的holes。然后在完全不同的地址上可能有几个相邻的范围。在NUMA，不同的cpu访问不同的内存。</p><p>Linux 中对物理内存存在三种模式 :FLATMEM、DISCONTIGMEM和SPARSEMEM。每个体系结构都定义了它支持什么内存模型、默认内存模型是什么以及是否可以手动覆盖该默认值。在arm64中只支持SPARSEMEM，本文的重点也在SPARSEMEM上。</p><h2 id="_1-flatmem-模型" tabindex="-1">1 FLATMEM 模型 <a class="header-anchor" href="#_1-flatmem-模型" aria-hidden="true">#</a></h2><p>FLATMEM 模型是最简单的模型。此模型适用于具有连续物理内存(或大部分为连续物理内存)的非numa系统。</p><p>在FLATMEM内存模型中，有一个全局mem_map数组，它映射整个物理内存。在mem_map数组中有些条目对应物理内存上holes,与这些holes对应的struct page 结构体没有完全初始化。</p><p><img src="'+i+'" alt=""></p><h2 id="_2-discontigmem-模型" tabindex="-1">2 DISCONTIGMEM 模型 <a class="header-anchor" href="#_2-discontigmem-模型" aria-hidden="true">#</a></h2><p>DISCONTIGMEM模型将物理内存视为节点集合，这与Linux NUMA支持的方式类似。对于每个节点，Linux都构造一个独立的内存管理子系统，由struct pglist_data(或简称pg_data_t)表示。pg_data_t包含node_mem_map数组，它映射属于该节点的物理页面。pg_data_t的node_start_pfn字段是属于该节点的第一个页面帧的编号。</p><p>每个node_mem_map数组其实就是一个FLATMEM内存模型。</p><div class="tip custom-block"><p class="custom-block-title">DISCONTIGMEM</p><p>DISCONTIGMEM 使用情况很少，很快可能被废弃。</p></div><p><img src="'+c+'" alt=""></p><h2 id="_3-sparsemem-模型" tabindex="-1">3 SPARSEMEM 模型 <a class="header-anchor" href="#_3-sparsemem-模型" aria-hidden="true">#</a></h2><p>SPARSEMEM是Linux中可用的最通用的内存模型，它是惟一支持多个高级特性的内存模型，比如物理内存的热插拔和热删除、非易失性内存设备的替代内存映射以及大型系统内存映射的延迟初始化。</p><p>SPARSEMEM模型将物理内存表示为section的集合。section由struct mem_section表示，其中包含section_mem_map，从逻辑上讲，它是指向struct页面数组的指针。使用SECTION_SIZE_BITS和MAX_PHYSMEM_BITS常量指定节的大小和最大节数，这些常量由支持SPARSEMEM的每个体系结构定义。MAX_PHYSMEM_BITS是体系结构支持的物理地址的实际宽度，SECTION_SIZE_BITS是一个任意值。</p><p><img src="'+F+`" alt=""></p><h2 id="_4-arm64-内存模型" tabindex="-1">4 ARM64 内存模型 <a class="header-anchor" href="#_4-arm64-内存模型" aria-hidden="true">#</a></h2><p>在 <code>mm/Kconfig</code> 中有如下配置项目</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#F8F8F2;">config SELECT_MEMORY_MODEL</span></span>
<span class="line"><span style="color:#F8F8F2;">	def_bool y</span></span>
<span class="line"><span style="color:#F8F8F2;">	depends on ARCH_SELECT_MEMORY_MODEL</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">choice</span></span>
<span class="line"><span style="color:#F8F8F2;">	prompt &quot;Memory model&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">	depends on SELECT_MEMORY_MODEL</span></span>
<span class="line"><span style="color:#F8F8F2;">	default DISCONTIGMEM_MANUAL if ARCH_DISCONTIGMEM_DEFAULT</span></span>
<span class="line"><span style="color:#F8F8F2;">	default SPARSEMEM_MANUAL if ARCH_SPARSEMEM_DEFAULT</span></span>
<span class="line"><span style="color:#F8F8F2;">	default FLATMEM_MANUAL</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">config FLATMEM_MANUAL</span></span>
<span class="line"><span style="color:#F8F8F2;">	bool &quot;Flat Memory&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">	depends on !(ARCH_DISCONTIGMEM_ENABLE || ARCH_SPARSEMEM_ENABLE) || ARCH_FLATMEM_ENABLE</span></span>
<span class="line"><span style="color:#F8F8F2;">	help</span></span>
<span class="line"><span style="color:#F8F8F2;">	  This option allows you to change some of the ways that</span></span>
<span class="line"><span style="color:#F8F8F2;">	  Linux manages its memory internally.  Most users will</span></span>
<span class="line"><span style="color:#F8F8F2;">	  only have one option here: FLATMEM.  This is normal</span></span>
<span class="line"><span style="color:#F8F8F2;">	  and a correct option.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  Some users of more advanced features like NUMA and</span></span>
<span class="line"><span style="color:#F8F8F2;">	  memory hotplug may have different options here.</span></span>
<span class="line"><span style="color:#F8F8F2;">	  DISCONTIGMEM is a more mature, better tested system,</span></span>
<span class="line"><span style="color:#F8F8F2;">	  but is incompatible with memory hotplug and may suffer</span></span>
<span class="line"><span style="color:#F8F8F2;">	  decreased performance over SPARSEMEM.  If unsure between</span></span>
<span class="line"><span style="color:#F8F8F2;">	  &quot;Sparse Memory&quot; and &quot;Discontiguous Memory&quot;, choose</span></span>
<span class="line"><span style="color:#F8F8F2;">	  &quot;Discontiguous Memory&quot;.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  If unsure, choose this option (Flat Memory) over any other.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">config DISCONTIGMEM_MANUAL</span></span>
<span class="line"><span style="color:#F8F8F2;">	bool &quot;Discontiguous Memory&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">	depends on ARCH_DISCONTIGMEM_ENABLE</span></span>
<span class="line"><span style="color:#F8F8F2;">	help</span></span>
<span class="line"><span style="color:#F8F8F2;">	  This option provides enhanced support for discontiguous</span></span>
<span class="line"><span style="color:#F8F8F2;">	  memory systems, over FLATMEM.  These systems have holes</span></span>
<span class="line"><span style="color:#F8F8F2;">	  in their physical address spaces, and this option provides</span></span>
<span class="line"><span style="color:#F8F8F2;">	  more efficient handling of these holes.  However, the vast</span></span>
<span class="line"><span style="color:#F8F8F2;">	  majority of hardware has quite flat address spaces, and</span></span>
<span class="line"><span style="color:#F8F8F2;">	  can have degraded performance from the extra overhead that</span></span>
<span class="line"><span style="color:#F8F8F2;">	  this option imposes.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  Many NUMA configurations will have this as the only option.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  If unsure, choose &quot;Flat Memory&quot; over this option.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">config SPARSEMEM_MANUAL</span></span>
<span class="line"><span style="color:#F8F8F2;">	bool &quot;Sparse Memory&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">	depends on ARCH_SPARSEMEM_ENABLE</span></span>
<span class="line"><span style="color:#F8F8F2;">	help</span></span>
<span class="line"><span style="color:#F8F8F2;">	  This will be the only option for some systems, including</span></span>
<span class="line"><span style="color:#F8F8F2;">	  memory hotplug systems.  This is normal.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  For many other systems, this will be an alternative to</span></span>
<span class="line"><span style="color:#F8F8F2;">	  &quot;Discontiguous Memory&quot;.  This option provides some potential</span></span>
<span class="line"><span style="color:#F8F8F2;">	  performance benefits, along with decreased code complexity,</span></span>
<span class="line"><span style="color:#F8F8F2;">	  but it is newer, and more experimental.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">	  If unsure, choose &quot;Discontiguous Memory&quot; or &quot;Flat Memory&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">	  over this option.</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">endchoice</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><p>而在 <code>arch/arm64/Kconfig</code> 只有如下配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">config ARCH_SPARSEMEM_ENABLE</span></span>
<span class="line"><span style="color:#F8F8F2;">	def_bool y</span></span>
<span class="line"><span style="color:#F8F8F2;">	select SPARSEMEM_VMEMMAP_ENABLE</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这样的话当你 <code>make menuconfig</code> 你只会看到只有 <code>Sparse Memory</code> 一个选项。也就是说在arm64位平台下只支持 SPARSEMEM_MANUAL</p><hr><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>转载请注明出处！ <a href="http://www.cxy.wiki" target="_blank" rel="noreferrer">探索者</a></p></div>`,28)),t(a,{title:n.$title},null,8,["title"])])}const E=e(m,[["render",u]]);export{_ as __pageData,E as default};
