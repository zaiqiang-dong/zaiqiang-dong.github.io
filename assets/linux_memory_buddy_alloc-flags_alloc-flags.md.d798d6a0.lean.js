import{_ as l,r as p,o as e,c as o,a as r,b as c}from"./app.a2daf185.js";const m=JSON.parse('{"title":"页分配掩码","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. 掩码介绍","slug":"_1-掩码介绍","link":"#_1-掩码介绍","children":[{"level":3,"title":"1.1 原始掩码","slug":"_1-1-原始掩码","link":"#_1-1-原始掩码","children":[]},{"level":3,"title":"1.2 掩码组合","slug":"_1-2-掩码组合","link":"#_1-2-掩码组合","children":[]},{"level":3,"title":"1.3 最终掩码","slug":"_1-3-最终掩码","link":"#_1-3-最终掩码","children":[]}]},{"level":2,"title":"掩码的使用","slug":"掩码的使用","link":"#掩码的使用","children":[]}],"relativePath":"linux/memory/buddy/alloc-flags/alloc-flags.md"}'),t={name:"linux/memory/buddy/alloc-flags/alloc-flags.md"};function i(n,s,F,b,y,_){const a=p("Vssue");return e(),o("div",null,[s[0]||(s[0]=r(`<h1 id="页分配掩码" tabindex="-1">页分配掩码 <a class="header-anchor" href="#页分配掩码" aria-hidden="true">#</a></h1><hr><table><thead><tr><th>软件版本</th><th>硬件版本</th><th>更新内容</th></tr></thead><tbody><tr><td>linux 4.19</td><td>arm64</td><td></td></tr></tbody></table><hr><h2 id="_1-掩码介绍" tabindex="-1">1. 掩码介绍 <a class="header-anchor" href="#_1-掩码介绍" aria-hidden="true">#</a></h2><h3 id="_1-1-原始掩码" tabindex="-1">1.1 原始掩码 <a class="header-anchor" href="#_1-1-原始掩码" aria-hidden="true">#</a></h3><p>最原始的一部分flags（前面带三个_）,后面的flags基本都是用这部分“组合”出来的,具体信息如下：</p><div class="language-c line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki monokai"><code><span class="line"></span>
<span class="line"><span style="color:#88846F;">/* Plain integer GFP bitmasks. Do not use this directly. */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * 分配区域指定 一般占用整个掩码的最低 1~4 BIT</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//从ZONE_DMA区域分配内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_DMA</span><span style="color:#F8F8F2;"> 		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">01</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//从ZONE_HIGHMEM活ZONE_NORMAL中分配内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_HIGHMEM</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">02</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//从ZONE_DMA32中分配内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_DMA32</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">04</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//页是可移动的</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_MOVABLE</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">08</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * 分配行为指定, 占用掩码的第 5～16 BIT </span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//页是可回收的</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_RECLAIMABLE</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">10</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_HIGH</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">20</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知			</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_IO</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">40</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_FS</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">80</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//需要非缓存的冷页</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_COLD</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">100</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//禁止分配失败警告</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NOWARN</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">200</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//一直重试直到成功				</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_REPEAT</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">400</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NOFAIL</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">800</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//失败返回不重试</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NORETRY</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">1000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//使用紧急分配链表</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_MEMALLOC</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">2000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_COMP</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">4000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//返回的页面初始化为0</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_ZERO</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">8000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * 分配类型指定， 占用掩码第 17～23 BIT</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//不使用紧急分配链表</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NOMEMALLOC</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">10000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//只允许在进程允许运行的CPU所关联的PCP分配内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_HARDWALL</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">20000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_THISNODE</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">40000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//用于原子分配，在任何情况下都不能中断</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_ATOMIC</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">80000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NOACCOUNT</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">100000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//避免被内存检测工具kmemcheck检测</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_NOTRACK</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">200000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//当内存不足时，直接进入内存回收</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_DIRECT_RECLAIM</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">400000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_OTHER_NODE</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">800000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_WRITE</span><span style="color:#F8F8F2;">		</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">1000000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//当内存不足时，唤醒内存回收</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">___GFP_KSWAPD_RECLAIM</span><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">0x</span><span style="color:#AE81FF;">2000000</span><span style="color:#F92672;">u</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br></div></div><h3 id="_1-2-掩码组合" tabindex="-1">1.2 掩码组合 <a class="header-anchor" href="#_1-2-掩码组合" aria-hidden="true">#</a></h3><p>这个部分一分是由第一部分的flags中的一个或者多个组合而成。</p><div class="language-c line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">/* If the above are modified, __GFP_BITS_SHIFT may need updating */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Physical address zone modifiers (see linux/mmzone.h - low four bits)</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * Do not put any conditional on these. If necessary modify the definitions</span></span>
<span class="line"><span style="color:#88846F;"> * without the underscores and use them consistently. The definitions here may</span></span>
<span class="line"><span style="color:#88846F;"> * be used in bit comparisons.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * 这个基本和第一部分一样</span></span>
<span class="line"><span style="color:#88846F;"> * 使用了__force修饰的变量可以进行强制类型转换, 没有使用 __force修饰的变量进行强制类型转换时, Sparse会给出警告.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//和第一部分基本一样</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_DMA</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_DMA)</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_HIGHMEM</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_HIGHMEM)</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_DMA32</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_DMA32)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//是页迁移机制所需的标志，可移动的</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_MOVABLE</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_MOVABLE)</span><span style="color:#88846F;">  /* Page is movable */</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_MOVABLE</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_MOVABLE)</span><span style="color:#88846F;">  /* ZONE_MOVABLE allowed */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//第一部分的组合</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_ZONEMASK</span><span style="color:#F8F8F2;">	(__GFP_DMA</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">__GFP_HIGHMEM</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">__GFP_DMA32</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">__GFP_MOVABLE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Page mobility and placement hints</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * These flags provide hints about how mobile the page is. Pages with similar</span></span>
<span class="line"><span style="color:#88846F;"> * mobility are placed within the same pageblocks to minimise problems due</span></span>
<span class="line"><span style="color:#88846F;"> * to external fragmentation.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_MOVABLE (also a zone modifier) indicates that the page can be</span></span>
<span class="line"><span style="color:#88846F;"> *   moved by page migration during memory compaction or can be reclaimed.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_RECLAIMABLE is used for slab allocations that specify</span></span>
<span class="line"><span style="color:#88846F;"> *   SLAB_RECLAIM_ACCOUNT and whose pages can be freed via shrinkers.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_WRITE indicates the caller intends to dirty the page. Where possible,</span></span>
<span class="line"><span style="color:#88846F;"> *   these pages will be spread between local zones to avoid all the dirty</span></span>
<span class="line"><span style="color:#88846F;"> *   pages being in one zone (fair zone allocation policy).</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_HARDWALL enforces the cpuset memory allocation policy.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_THISNODE forces the allocation to be satisified from the requested</span></span>
<span class="line"><span style="color:#88846F;"> *   node with no fallbacks or placement policy enforcements.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"><span style="color:#F8F8F2;"> </span></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//是页迁移机制所需的标志，可回收的</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_RECLAIMABLE</span><span style="color:#F8F8F2;"> ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_RECLAIMABLE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_WRITE</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_WRITE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_HARDWALL</span><span style="color:#F8F8F2;">   ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_HARDWALL)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_THISNODE</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_THISNODE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Watermark modifiers -- controls access to emergency reserves</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_HIGH indicates that the caller is high-priority and that granting</span></span>
<span class="line"><span style="color:#88846F;"> *   the request is necessary before the system can make forward progress.</span></span>
<span class="line"><span style="color:#88846F;"> *   For example, creating an IO context to clean pages.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_ATOMIC indicates that the caller cannot reclaim or sleep and is</span></span>
<span class="line"><span style="color:#88846F;"> *   high priority. Users are typically interrupt handlers. This may be</span></span>
<span class="line"><span style="color:#88846F;"> *   used in conjunction with __GFP_HIGH</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_MEMALLOC allows access to all memory. This should only be used when</span></span>
<span class="line"><span style="color:#88846F;"> *   the caller guarantees the allocation will allow more memory to be freed</span></span>
<span class="line"><span style="color:#88846F;"> *   very shortly e.g. process exiting or swapping. Users either should</span></span>
<span class="line"><span style="color:#88846F;"> *   be the MM or co-ordinating closely with the VM (e.g. swap over NFS).</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOMEMALLOC is used to explicitly forbid access to emergency reserves.</span></span>
<span class="line"><span style="color:#88846F;"> *   This takes precedence over the __GFP_MEMALLOC flag if both are set.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOACCOUNT ignores the accounting for kmemcg limit enforcement.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//中断中分配内存会使用，表明不允许打断</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_ATOMIC</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_ATOMIC)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//高优先级分配内存，</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_HIGH</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_HIGH)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//调用者需要很快释放分配的内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_MEMALLOC</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_MEMALLOC)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//禁止从应急的内存空间分配 </span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOMEMALLOC</span><span style="color:#F8F8F2;"> ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NOMEMALLOC)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOACCOUNT</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NOACCOUNT)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Reclaim modifiers</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_IO can start physical IO.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_FS can call down to the low-level FS. Clearing the flag avoids the</span></span>
<span class="line"><span style="color:#88846F;"> *   allocator recursing into the filesystem which might already be holding</span></span>
<span class="line"><span style="color:#88846F;"> *   locks.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_DIRECT_RECLAIM indicates that the caller may enter direct reclaim.</span></span>
<span class="line"><span style="color:#88846F;"> *   This flag can be cleared to avoid unnecessary delays when a fallback</span></span>
<span class="line"><span style="color:#88846F;"> *   option is available.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_KSWAPD_RECLAIM indicates that the caller wants to wake kswapd when</span></span>
<span class="line"><span style="color:#88846F;"> *   the low watermark is reached and have it reclaim pages until the high</span></span>
<span class="line"><span style="color:#88846F;"> *   watermark is reached. A caller may wish to clear this flag when fallback</span></span>
<span class="line"><span style="color:#88846F;"> *   options are available and the reclaim is likely to disrupt the system. The</span></span>
<span class="line"><span style="color:#88846F;"> *   canonical example is THP allocation where a fallback is cheap but</span></span>
<span class="line"><span style="color:#88846F;"> *   reclaim/compaction may cause indirect stalls.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_RECLAIM is shorthand to allow/forbid both direct and kswapd reclaim.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_REPEAT: Try hard to allocate the memory, but the allocation attempt</span></span>
<span class="line"><span style="color:#88846F;"> *   _might_ fail.  This depends upon the particular VM implementation.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOFAIL: The VM implementation _must_ retry infinitely: the caller</span></span>
<span class="line"><span style="color:#88846F;"> *   cannot handle allocation failures. New users should be evaluated carefully</span></span>
<span class="line"><span style="color:#88846F;"> *   (and the flag should be used only when there is no reasonable failure</span></span>
<span class="line"><span style="color:#88846F;"> *   policy) but it is definitely preferable to use the flag rather than</span></span>
<span class="line"><span style="color:#88846F;"> *   opencode endless loop around allocator.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NORETRY: The VM implementation must not retry indefinitely and will</span></span>
<span class="line"><span style="color:#88846F;"> *   return NULL when direct reclaim and memory compaction have failed to allow</span></span>
<span class="line"><span style="color:#88846F;"> *   the allocation to succeed.  The OOM killer is not called with the current</span></span>
<span class="line"><span style="color:#88846F;"> *   implementation.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//说明在查找空闲内存期间内核可以进行I/O操作</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_IO</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_IO)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//允许内核执行VFS操作</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_FS</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_FS)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//当内存不足时，直接进入内存回收</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_DIRECT_RECLAIM</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_DIRECT_RECLAIM)</span><span style="color:#88846F;"> /* Caller can reclaim */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//当内存不足时，希望唤醒内存回收，回收成功后分配</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_KSWAPD_RECLAIM</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_KSWAPD_RECLAIM)</span><span style="color:#88846F;"> /* kswapd can wake */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//上面两个flag的组合</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_RECLAIM</span><span style="color:#F8F8F2;"> ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)(___GFP_DIRECT_RECLAIM</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">___GFP_KSWAPD_RECLAIM))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//在分配失败后自动重试，但在尝试若干次之后会停止</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_REPEAT</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_REPEAT)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//在分配失败后一直重试，直至成功</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOFAIL</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NOFAIL)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//在分配失败后不重试直接返回</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NORETRY</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NORETRY)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Action modifiers</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_COLD indicates that the caller does not expect to be used in the near</span></span>
<span class="line"><span style="color:#88846F;"> *   future. Where possible, a cache-cold page will be returned.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOWARN suppresses allocation failure reports.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_COMP address compound page metadata.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_ZERO returns a zeroed page on success.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOTRACK avoids tracking with kmemcheck.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_NOTRACK_FALSE_POSITIVE is an alias of __GFP_NOTRACK. It&#39;s a means of</span></span>
<span class="line"><span style="color:#88846F;"> *   distinguishing in the source between false positives and allocations that</span></span>
<span class="line"><span style="color:#88846F;"> *   cannot be supported (e.g. page tables).</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_OTHER_NODE is for allocations that are on a remote node but that</span></span>
<span class="line"><span style="color:#88846F;"> *   should not be accounted for as a remote allocation in vmstat. A</span></span>
<span class="line"><span style="color:#88846F;"> *   typical user would be khugepaged collapsing a huge page on a remote</span></span>
<span class="line"><span style="color:#88846F;"> *   node.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//分配一个不在cpu 缓存中的内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_COLD</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_COLD)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//在分配失败时禁止内核故障警告</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOWARN</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NOWARN)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//分配大页时会使用</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_COMP</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_COMP)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//返回的页面初始化为0</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_ZERO</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_ZERO)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//避免被内存检测工具kmemcheck检测</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOTRACK</span><span style="color:#F8F8F2;">	((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_NOTRACK)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_NOTRACK_FALSE_POSITIVE</span><span style="color:#F8F8F2;"> (__GFP_NOTRACK)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//未知</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_OTHER_NODE</span><span style="color:#F8F8F2;"> ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)___GFP_OTHER_NODE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">/* Room for N __GFP_FOO bits */</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_BITS_SHIFT</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">26</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">__GFP_BITS_MASK</span><span style="color:#F8F8F2;"> ((__force </span><span style="color:#66D9EF;font-style:italic;">gfp_t</span><span style="color:#F8F8F2;">)((</span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">&lt;&lt;</span><span style="color:#F8F8F2;"> __GFP_BITS_SHIFT) </span><span style="color:#F92672;">-</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br></div></div><h3 id="_1-3-最终掩码" tabindex="-1">1.3 最终掩码 <a class="header-anchor" href="#_1-3-最终掩码" aria-hidden="true">#</a></h3><p>这部分的掩码就是我们在分配内存过程经常会使用的掩码。</p><div class="language-c line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">/*</span></span>
<span class="line"><span style="color:#88846F;"> * Useful GFP flag combinations that are commonly used. It is recommended</span></span>
<span class="line"><span style="color:#88846F;"> * that subsystems start with one of these combinations and then set/clear</span></span>
<span class="line"><span style="color:#88846F;"> * __GFP_FOO flags as necessary.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_ATOMIC users can not sleep and need the allocation to succeed. A lower</span></span>
<span class="line"><span style="color:#88846F;"> *   watermark is applied to allow access to &quot;atomic reserves&quot;</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_KERNEL is typical for kernel-internal allocations. The caller requires</span></span>
<span class="line"><span style="color:#88846F;"> *   ZONE_NORMAL or a lower zone for direct access but can direct reclaim.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_NOWAIT is for kernel allocations that should not stall for direct</span></span>
<span class="line"><span style="color:#88846F;"> *   reclaim, start physical IO or use any filesystem callback.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_NOIO will use direct reclaim to discard clean pages or slab pages</span></span>
<span class="line"><span style="color:#88846F;"> *   that do not require the starting of any physical IO.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_NOFS will use direct reclaim but will not use any filesystem interfaces.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_USER is for userspace allocations that also need to be directly</span></span>
<span class="line"><span style="color:#88846F;"> *   accessibly by the kernel or hardware. It is typically used by hardware</span></span>
<span class="line"><span style="color:#88846F;"> *   for buffers that are mapped to userspace (e.g. graphics) that hardware</span></span>
<span class="line"><span style="color:#88846F;"> *   still must DMA to. cpuset limits are enforced for these allocations.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_DMA exists for historical reasons and should be avoided where possible.</span></span>
<span class="line"><span style="color:#88846F;"> *   The flags indicates that the caller requires that the lowest zone be</span></span>
<span class="line"><span style="color:#88846F;"> *   used (ZONE_DMA or 16M on x86-64). Ideally, this would be removed but</span></span>
<span class="line"><span style="color:#88846F;"> *   it would require careful auditing as some users really require it and</span></span>
<span class="line"><span style="color:#88846F;"> *   others use the flag to avoid lowmem reserves in ZONE_DMA and treat the</span></span>
<span class="line"><span style="color:#88846F;"> *   lowest zone as a type of emergency reserve.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_DMA32 is similar to GFP_DMA except that the caller requires a 32-bit</span></span>
<span class="line"><span style="color:#88846F;"> *   address.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_HIGHUSER is for userspace allocations that may be mapped to userspace,</span></span>
<span class="line"><span style="color:#88846F;"> *   do not need to be directly accessible by the kernel but that cannot</span></span>
<span class="line"><span style="color:#88846F;"> *   move once in use. An example may be a hardware allocation that maps</span></span>
<span class="line"><span style="color:#88846F;"> *   data directly into userspace but has no addressing limitations.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_HIGHUSER_MOVABLE is for userspace allocations that the kernel does not</span></span>
<span class="line"><span style="color:#88846F;"> *   need direct access to but can use kmap() when access is required. They</span></span>
<span class="line"><span style="color:#88846F;"> *   are expected to be movable via page reclaim or page migration. Typically,</span></span>
<span class="line"><span style="color:#88846F;"> *   pages on the LRU would also be allocated with GFP_HIGHUSER_MOVABLE.</span></span>
<span class="line"><span style="color:#88846F;"> *</span></span>
<span class="line"><span style="color:#88846F;"> * GFP_TRANSHUGE is used for THP allocations. They are compound allocations</span></span>
<span class="line"><span style="color:#88846F;"> *   that will fail quickly if memory is not available and will not wake</span></span>
<span class="line"><span style="color:#88846F;"> *   kswapd on failure.</span></span>
<span class="line"><span style="color:#88846F;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//用于原子分配，不能中断, 可使用紧急分配链表中的内存, 这个标志用在中断处理程序, 下半部, </span></span>
<span class="line"><span style="color:#F8F8F2;"> </span><span style="color:#88846F;">//持有自旋锁以及其他不能睡眠的地方</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_ATOMIC</span><span style="color:#F8F8F2;">	(__GFP_HIGH</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">__GFP_ATOMIC</span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;">__GFP_KSWAPD_RECLAIM)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//这是一种常规的分配方式, 可能会阻塞. 这个标志在睡眠安全时用在进程的长下文代码中. 为了获取调用者所需的内存,</span></span>
<span class="line"><span style="color:#88846F;">//内核会尽力而为. 这个标志应该是首选标志</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_KERNEL</span><span style="color:#F8F8F2;">	(__GFP_RECLAIM </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_IO </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_FS)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//与GFP_ATOMIC类似</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_NOWAIT</span><span style="color:#F8F8F2;">	(__GFP_KSWAPD_RECLAIM)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//这种分配可以阻塞, 但不会启动磁盘I/O, 这个标志在不能引发更多的磁盘I/O时阻塞I/O代码</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_NOIO</span><span style="color:#F8F8F2;">	(__GFP_RECLAIM)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//这种分配在必要时可以阻塞, 但是也可能启动磁盘, 但是不会启动文件系统操作</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_NOFS</span><span style="color:#F8F8F2;">	(__GFP_RECLAIM </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_IO)</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_TEMPORARY</span><span style="color:#F8F8F2;">	(__GFP_RECLAIM </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_IO </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_FS </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">\\</span></span>
<span class="line"><span style="color:#F8F8F2;">			 __GFP_RECLAIMABLE)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//这是一种常规的分配方式, 可能会阻塞. 这个标志用于为用户空间进程分配内存时使用</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_USER</span><span style="color:#F8F8F2;">	(__GFP_RECLAIM </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_IO </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_FS </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_HARDWALL)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//用于分配适用于DMA的内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_DMA</span><span style="color:#F8F8F2;">		__GFP_DMA</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_DMA32</span><span style="color:#F8F8F2;">	__GFP_DMA32</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">//是GFP_USER的一个扩展, 也用于用户空间. 它允许分配无法直接映射的高端内存</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_HIGHUSER</span><span style="color:#F8F8F2;">	(GFP_USER </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_HIGHMEM)</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_HIGHUSER_MOVABLE</span><span style="color:#F8F8F2;">	(GFP_HIGHUSER </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_MOVABLE)</span></span>
<span class="line"><span style="color:#F92672;">#define</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GFP_TRANSHUGE</span><span style="color:#F8F8F2;">	((GFP_HIGHUSER_MOVABLE </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_COMP </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">\\</span></span>
<span class="line"><span style="color:#F8F8F2;">			 __GFP_NOMEMALLOC </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_NORETRY </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> __GFP_NOWARN) </span><span style="color:#F92672;">&amp;</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">\\</span></span>
<span class="line"><span style="color:#F8F8F2;">			 </span><span style="color:#F92672;">~</span><span style="color:#F8F8F2;">__GFP_KSWAPD_RECLAIM)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h2 id="掩码的使用" tabindex="-1">掩码的使用 <a class="header-anchor" href="#掩码的使用" aria-hidden="true">#</a></h2><p>经常使用是就是上面1.3中描述的掩码组合，具体含义如1.3注释。</p><hr><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>转载请注明出处！ <a href="http://www.cxy.wiki" target="_blank" rel="noreferrer">探索者</a></p></div>`,18)),c(a,{title:n.$title},null,8,["title"])])}const d=l(t,[["render",i]]);export{m as __pageData,d as default};
