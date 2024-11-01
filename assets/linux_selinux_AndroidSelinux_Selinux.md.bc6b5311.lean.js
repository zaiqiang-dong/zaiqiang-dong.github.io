import{_ as l,r as e,o as p,c as r,a as c,b as o}from"./app.21cc2de4.js";const t="/blog/assets/selinux1.f8c59096.png",i="/blog/assets/selinux2.3a6667ed.png",f=JSON.parse('{"title":"Android-Selinux-详解","description":"","frontmatter":{"title":"Android-Selinux-详解","tags":["Android","selinux"],"categories":"selinux","comments":true,"copyright":true,"date":"2018-10-18T10:09:39.000Z"},"headers":[{"level":2,"title":"0.简介","slug":"_0-简介","link":"#_0-简介","children":[]},{"level":2,"title":"1.现有权限介绍","slug":"_1-现有权限介绍","link":"#_1-现有权限介绍","children":[]},{"level":2,"title":"2. 现有权限存在的问题","slug":"_2-现有权限存在的问题","link":"#_2-现有权限存在的问题","children":[]},{"level":2,"title":"3.SElinux权限控制","slug":"_3-selinux权限控制","link":"#_3-selinux权限控制","children":[]},{"level":2,"title":"4.SELinux 的运作模式","slug":"_4-selinux-的运作模式","link":"#_4-selinux-的运作模式","children":[]},{"level":2,"title":"5.SElinxu为什么可以解决DAC的问题？","slug":"_5-selinxu为什么可以解决dac的问题","link":"#_5-selinxu为什么可以解决dac的问题","children":[]},{"level":2,"title":"6.Android中SElinux的体现","slug":"_6-android中selinux的体现","link":"#_6-android中selinux的体现","children":[{"level":3,"title":"6.1 Android 中的安全性文本","slug":"_6-1-android-中的安全性文本","link":"#_6-1-android-中的安全性文本","children":[]},{"level":3,"title":"6.2 Android 中的政策","slug":"_6-2-android-中的政策","link":"#_6-2-android-中的政策","children":[]},{"level":3,"title":"6.3 类型定义","slug":"_6-3-类型定义","link":"#_6-3-类型定义","children":[]}]},{"level":2,"title":"7.如何快速添加一安全性规则","slug":"_7-如何快速添加一安全性规则","link":"#_7-如何快速添加一安全性规则","children":[]}],"relativePath":"linux/selinux/AndroidSelinux/Selinux.md"}'),F={name:"linux/selinux/AndroidSelinux/Selinux.md"};function b(n,s,u,y,m,d){const a=e("Vssue");return p(),r("div",null,[s[0]||(s[0]=c('<h2 id="_0-简介" tabindex="-1">0.简介 <a class="header-anchor" href="#_0-简介" aria-hidden="true">#</a></h2><br> SELINUX是可以理解为一种android上面的安全机制，是有美国国家安全局和一些公司设计的一个针对linux的安全加强系统我们可以通过配置SELINUX的相关policy，来定制自己的手机的一些权限。它比原有linux 权限机制更加严格。<br><h2 id="_1-现有权限介绍" tabindex="-1">1.现有权限介绍 <a class="header-anchor" href="#_1-现有权限介绍" aria-hidden="true">#</a></h2><p>现有的权限:自主式访问控制, DAC<br> DAC 访问方式如下图所示：<br><img src="'+t+`" alt="自主式访问控制"></p><p>上面的这个上关系可以通过以下方法来测试：</p><ol><li>在一台linux机器建立两个普通账户。</li><li>用root 权限打开/tmp/目录，新建立目录，并打开。</li><li>用其中一个账户来编写如下的程序并通过ＧＣＣ编译</li><li>用同一个账户来touch t.txt</li><li>用同一个账户来执行编译出来的程序，发现可以正常执行</li><li>用另个一个账户来执行相同的程序，发现可以执行但不能读写文件</li></ol><div class="language-c line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki monokai"><code><span class="line"></span>
<span class="line"><span style="color:#F92672;">#include</span><span style="color:#F8F8F2;"> ”stdio.h“</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">void</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">main</span><span style="color:#F8F8F2;">(</span><span style="color:#66D9EF;font-style:italic;">void</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">	FILE </span><span style="color:#F92672;">*</span><span style="color:#F8F8F2;">fp;</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#66D9EF;font-style:italic;">char</span><span style="color:#F8F8F2;"> ch; </span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> ((fp </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">fopen</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&quot;./t.txt&quot;</span><span style="color:#F8F8F2;">,</span><span style="color:#E6DB74;">&quot;rt+&quot;</span><span style="color:#F8F8F2;">)) </span><span style="color:#F92672;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">NULL</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">		</span><span style="color:#A6E22E;">printf</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&quot;Cannot open file and Exit!&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">		</span><span style="color:#A6E22E;">exit</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">	}</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#A6E22E;">printf</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&quot;input a string:</span><span style="color:#AE81FF;">\\n</span><span style="color:#E6DB74;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">	ch</span><span style="color:#F92672;">=</span><span style="color:#A6E22E;">getchar</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">while</span><span style="color:#F8F8F2;"> (ch </span><span style="color:#F92672;">!=</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;*&#39;</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">		</span><span style="color:#A6E22E;">fputc</span><span style="color:#F8F8F2;">(ch,fp);</span></span>
<span class="line"><span style="color:#F8F8F2;">		ch</span><span style="color:#F92672;">=</span><span style="color:#A6E22E;">getchar</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">	}</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#A6E22E;">rewind</span><span style="color:#F8F8F2;">(fp);</span></span>
<span class="line"><span style="color:#F8F8F2;">	ch </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">fgetc</span><span style="color:#F8F8F2;">(fp);</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#F92672;">while</span><span style="color:#F8F8F2;"> (ch </span><span style="color:#F92672;">!=</span><span style="color:#F8F8F2;"> EOF) {</span></span>
<span class="line"><span style="color:#F8F8F2;">		</span><span style="color:#A6E22E;">putchar</span><span style="color:#F8F8F2;">(ch);</span></span>
<span class="line"><span style="color:#F8F8F2;">		ch </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">fgetc</span><span style="color:#F8F8F2;">(fp);</span></span>
<span class="line"><span style="color:#F8F8F2;">	}					</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#A6E22E;">printf</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&quot;The end and Close file!</span><span style="color:#AE81FF;">\\n</span><span style="color:#E6DB74;">&quot;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#A6E22E;">fclose</span><span style="color:#F8F8F2;">(fp);</span></span>
<span class="line"><span style="color:#F8F8F2;">	</span><span style="color:#A6E22E;">exit</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="_2-现有权限存在的问题" tabindex="-1">2. 现有权限存在的问题 <a class="header-anchor" href="#_2-现有权限存在的问题" aria-hidden="true">#</a></h2><br> - root 具有最高的权限:如果不小心某支程序被有心人士取得, 且该程序属于 root的权限,那么这支程序就可以在系统上进行任何资源的存取! <br> - 用户可以取得程序来变更档案资源的访问权限:如果你不小心将某个目录的权限设定为777,由于对任何人的权限会变成rwx,因此该目录就会被任何人所任意存取! <h2 id="_3-selinux权限控制" tabindex="-1">3.SElinux权限控制 <a class="header-anchor" href="#_3-selinux权限控制" aria-hidden="true">#</a></h2><br> SElinux权限控制:委任式访问控制, MAC<br> **他可以针对特定的程序与特定的档案资源来进行权限的控管! 也就是说,即使你是root,那么在使用不同的程序时,你所能取得的权限并不一定是 root ,而得要看当时该程序的设定而定。如此一来,我们针对控制的『主体』变成了『程序』而不是用户.此外,这个主体程序也不能任意使用系统档案资源,因为每个档案资源也有针对该主体程序设定可取用的权限.** <br> 如此一来,控件目就细的多了!但整个系统程序那么多、档案那么多,一项一项控制可就没完没了! 所以SELinux 也提供一些预设的政策 (Policy) ,并在该政策内提供多个规则(rule),让你可以选择是否启用该控制规则! <h2 id="_4-selinux-的运作模式" tabindex="-1">4.SELinux 的运作模式 <a class="header-anchor" href="#_4-selinux-的运作模式" aria-hidden="true">#</a></h2><br><p>再次的重复说明一下,SELinux 是透过 MAC 的方式来控管程序,他控制的主体是程序, 而目标则是该 程序能否读取的『档案资源』!所以先来说明一下这些的相关性<br><strong>主体 (Subject):</strong> SELinux 主要想要管理的就是程序,因此你可以将『主体』跟process 划上等号; <br><strong>目标 (Object):</strong> 主体程序能否存取的『目标资源』一般就是文件系统。因此这个目标项目可以等文件系统划上等 号;<br><strong>政策 (Policy):</strong> 由于程序与档案数量庞大,因此 SELinux 会依据某些服务来制订基本的存取安全性政策。这些政 策内还会有详细的规则 (rule) 来指定不同的服务开放某些资源的存取与否。<br><strong>安全性本文 (security context):</strong> 我们刚刚谈到了主体、目标与政策面,但是主体能不能存取目标除了政策指定之外,主体与目标 的安全性本文必须一致才能够顺利存取。 这个安全性本文 (security context) 有点类似文件系统 的 rwx 啦!安全性本文的内容与设定是非常重要的! 如果设定错误,你的某些服务(主体程序)就 无法存取文件系统(目标资源),当然就会一直出现『权限不符』的错误讯息了! <br> 安全性本文存在于主体程序中与目标档案资源中。程序在内存内,所以安全性本文可以存入是没问题。那档案的安全性本文是记录在哪里呢?事实上,安全性本文是放置到档案的 inode 内的,因此主体程序想要读取目标档案资源时,同样需要读取 inode , 这 inode 内就可以比对安全性本文以及 rwx 等权限值是否正确,而给予适当的读取权限依据。<br> 先看系统中的安全性文本：<br> 1.先看文件的安全性文本</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">shell@msm8226:/ # ls -Z</span></span>
<span class="line"><span style="color:#F8F8F2;">drwxr-xr-x root     root              u:object_r:cgroup:s0 acct</span></span>
<span class="line"><span style="color:#F8F8F2;">drwxrwx--- system   cache             u:object_r:cache_file:s0 cache</span></span>
<span class="line"><span style="color:#F8F8F2;">lrwxrwxrwx root     root              u:object_r:rootfs:s0 charger -&gt; /sbin/healthd</span></span>
<span class="line"><span style="color:#F8F8F2;">dr-x------ root     root              u:object_r:rootfs:s0 config</span></span>
<span class="line"><span style="color:#F8F8F2;">lrwxrwxrwx root     root              u:object_r:rootfs:s0 d -&gt; /sys/kernel/debug</span></span>
<span class="line"><span style="color:#F8F8F2;">drwxrwx--x system   system            u:object_r:system_data_file:s0 data</span></span>
<span class="line"><span style="color:#F8F8F2;">-rw-r--r-- root     root              u:object_r:rootfs:s0 default.prop</span></span>
<span class="line"><span style="color:#F8F8F2;">drwxr-xr-x root     root              u:object_r:device:s0 dev</span></span>
<span class="line"><span style="color:#F8F8F2;">lrwxrwxrwx root     root              u:object_r:rootfs:s0 etc -&gt; /system/etc</span></span>
<span class="line"><span style="color:#F8F8F2;">-rw-r--r-- root     root              u:object_r:rootfs:s0 file_contexts</span></span>
<span class="line"><span style="color:#F8F8F2;">dr-xr-x--- system   system            u:object_r:firmware_file:s0 firmware</span></span>
<span class="line"><span style="color:#F8F8F2;">-rw-r----- root     root              u:object_r:rootfs:s0 fstab.qcom</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>2.再看一下进程的安全性文本：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">u:r:init:s0                    root      1     0     /init</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      2     0     kthreadd</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      3     2     ksoftirqd/0</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      6     2     kworker/u:0</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      7     2     kworker/u:0H</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      8     2     migration/0</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      9     2     watchdog/0</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      25    2     khelper</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      26    2     netns</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      31    2     kworker/0:1H</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      32    2     modem_notifier</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      33    2     smd_channel_clo</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      34    2     smsm_cb_wq</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      36    2     rpm-smd</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      37    2     kworker/u:1H</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      44    2     irq/47-cpr</span></span>
<span class="line"><span style="color:#F8F8F2;">u:r:kernel:s0                  root      45    2     mpm</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>如上所示,安全性本文主要用冒号分为三个字段,这三个字段的意义为:<br><strong>Identify:Role:Type[:Range]</strong><strong>身份识别:角色:类型</strong><br> 这三个字段的意义仔细的说明一下吧:<br><strong>身份识别 (Identify):</strong> 相当于账号方面的身份识别!主要的身份识别则有底下三种常见的类型:</p><ul><li>root:表示 root 的账号身份,如同上面的表格显示的是 root 家目录下的数据啊!</li><li>system_u:表示系统程序方面的识别,通常就是程序啰;</li><li>user_u:代表的是一般使用者账号相关的身份。</li></ul><p>你会发现身份识别中,除了 root 之外,其他的识别后面都会加上『 _u 』的字样呢! 这个身份识别重点再让我们了解该数据为何种身份所有哩~ 而系统上面大部分的数据都会是 system_u 或root 啦!至于如果是在 /home 底下的数据,那么大部分应该就会是 user_u .<br><strong>角色 (Role):</strong> 透过角色字段,我们可以知道这个数据是属于程序、档案资源还是代表使用者。一般的角色有:</p><ul><li>object_r:代表的是档案或目录等档案资源,这应该是最常见的啰;</li><li>system_r:代表的就是程序啦!不过,一般使用者也会被指定成为 system_r 喔!</li></ul><p>你也会发现角色的字段最后面使用『 _r 』来结尾!因为是 role 的意思嘛!<br><strong>类型 (Type) :(最重要!)</strong> 基本上,一个主体程序能不能读取到这个档案资源,与类型字段有关!而类型字段 在档案与程序的定义不太相同,分别是:</p><ul><li>type:在档案资源 (Object) 上面称为类型 (Type);</li><li>domain:在主体程序 (Subject) 则称为领域 (domain) 了!</li></ul><p>domain 需要与 type 搭配,则该程序才能够顺利的读取档案资源啦!<br><strong>级别(Range):</strong><br> 级别和SELinux为了满足军用和教育行业而设计的Multi-Level Security（MLS）机制有关。但是在Android中，因为只使用了S0所以这里不作更多的介绍。<br><strong>之间的关系如下图所示：</strong><br><img src="`+i+`" alt="关系"></p><h2 id="_5-selinxu为什么可以解决dac的问题" tabindex="-1">5.SElinxu为什么可以解决DAC的问题？ <a class="header-anchor" href="#_5-selinxu为什么可以解决dac的问题" aria-hidden="true">#</a></h2><br> **先说一下，加入SElinux之后的访问是什么样的？**<br> 加入SElinux之后，DAC的访问方式没有废弃，而是DAC和MAC 两者合作达成一个更加安全的访问控制。一般是先进行DAC的检查，然后再进行MAC的检查，两者都通过才可以访问。<br> **SElinux 是怎么解决DAC的安全问题的？**<br> **DAC是基于用户的权限控制，也是说一个用户只要有读写这个文件的权限的，那么他就可以启动任何一个进程去读写这个文件，而MAC是基于域或者类型的访问控制，换句话说，它控制的对象不是用户，而是一个进程或者说是一个域（当然对于文件来说是类型），例如，以root启动一个程序, 如果是DAC 的时代，那这个上程序可以操作任何一个文件，但是MAC的时代，情况就一样了，就算是root要操作一个文件，也必需要符合相关政策 (Policy)的规定。所以说SElinux解决了ＤＡＣ的问题。** <h2 id="_6-android中selinux的体现" tabindex="-1">6.Android中SElinux的体现 <a class="header-anchor" href="#_6-android中selinux的体现" aria-hidden="true">#</a></h2><h3 id="_6-1-android-中的安全性文本" tabindex="-1">6.1 Android 中的安全性文本 <a class="header-anchor" href="#_6-1-android-中的安全性文本" aria-hidden="true">#</a></h3><p><br>Android 中的安全性文本主要在这这个目录下：<code>external/sepolicy/</code> 这这个目录下执行<code>ls *_contexts</code>可以看到：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">file_contexts  genfs_contexts  initial_sid_contexts  port_contexts  property_contexts  seapp_contexts  service_contexts</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这些文件都是Android 中的安全性文本。 <br><strong>注意：</strong> 进程的安全性文本在那存放？ 进程的安全性文本一般会由.rc的文件指定，在程序启动时候作为进程信息一部分存在，这样我们在执行ps -Ｚ时才能看到。<br> 介绍一下各个文件的作用：</p><ul><li>file_contexts：主要是文件相关的</li><li>seapp_contexts：主要是ＡＰＰ相关的</li><li>property_contexts：主要是系统属性相关的</li><li>initial_sid_contexts：主要是配合initial_sids（也在external/sepolicy）使用的，主要是用来初始化Object的安全性文本，在相关资料中这个动作称为Security Labeling</li><li>port_contexts：主要是网络相关的</li><li>service_contexts：主要系统服务相关的</li><li>genfs_contexts：主要是一些特殊的文件相关 <br><strong>以file_contexts为例，内容如下(实在是太长了，以下是部分)：</strong><br>可以对照安全性本文的介绍看一下。 <br></li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">###########################################</span></span>
<span class="line"><span style="color:#F8F8F2;"># Root</span></span>
<span class="line"><span style="color:#F8F8F2;">/			u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># Data files</span></span>
<span class="line"><span style="color:#F8F8F2;">/adb_keys		u:object_r:adb_keys_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/default\\.prop		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/fstab\\..*		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/init\\..*		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/res(/.*)?		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/ueventd\\..*		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># Executables</span></span>
<span class="line"><span style="color:#F8F8F2;">/charger		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/init			u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sbin(/.*)?		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># Empty directories</span></span>
<span class="line"><span style="color:#F8F8F2;">/lost\\+found		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/proc			u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># SELinux policy files</span></span>
<span class="line"><span style="color:#F8F8F2;">/file_contexts		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/property_contexts	u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/seapp_contexts		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sepolicy		u:object_r:rootfs:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">##########################</span></span>
<span class="line"><span style="color:#F8F8F2;"># Devices</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev(/.*)?		u:object_r:device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/akm8973.*		u:object_r:sensors_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/accelerometer	u:object_r:sensors_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/adf[0-9]*		u:object_r:graphics_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">......</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/tty		u:object_r:owntty_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/tty[0-9]*		u:object_r:tty_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/ttyS[0-9]*		u:object_r:serial_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/tun		u:object_r:tun_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/uhid		u:object_r:uhid_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/uinput		u:object_r:uhid_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/uio[0-9]*		u:object_r:uio_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/urandom		u:object_r:urandom_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/dev/usb_accessory	u:object_r:usbaccessory_device:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># System files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/system(/.*)?		u:object_r:system_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/sh		--	u:object_r:shell_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/run-as	--	u:object_r:runas_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/bootanimation u:object_r:bootanim_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/app_process32	u:object_r:zygote_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/app_process64	u:object_r:zygote_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/servicemanager	u:object_r:servicemanager_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/surfaceflinger	u:object_r:surfaceflinger_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">......</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/uncrypt     u:object_r:uncrypt_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/logwrapper  u:object_r:system_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/vdc         u:object_r:vdc_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/install-recovery.sh u:object_r:install_recovery_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/dex2oat     u:object_r:dex2oat_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"># patchoat executable has (essentially) the same requirements as dex2oat.</span></span>
<span class="line"><span style="color:#F8F8F2;">/system/bin/patchoat    u:object_r:dex2oat_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># Vendor files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/vendor(/.*)?		u:object_r:system_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/vendor/bin/gpsd	u:object_r:gpsd_exec:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># Data files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/data(/.*)?		u:object_r:system_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/.layout_version		u:object_r:install_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">......</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/mediadrm(/.*)?	u:object_r:media_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/property(/.*)?	u:object_r:property_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># Misc data</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/adb(/.*)?            u:object_r:adb_keys_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/audio(/.*)?          u:object_r:audio_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/bluetooth(/.*)?      u:object_r:bluetooth_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/bluedroid(/.*)?      u:object_r:bluetooth_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/bluedroid/\\.a2dp_ctrl u:object_r:bluetooth_socket:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">......</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/user(/.*)?           u:object_r:misc_user_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/vpn(/.*)?            u:object_r:vpn_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/wifi(/.*)?           u:object_r:wifi_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/wifi/sockets(/.*)?   u:object_r:wpa_socket:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/wifi/sockets/wpa_ctrl.*   u:object_r:system_wpa_socket:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/wifi/hostapd(/.*)?   u:object_r:wpa_socket:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/misc/zoneinfo(/.*)?       u:object_r:zoneinfo_data_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># coredump directory for userdebug/eng devices</span></span>
<span class="line"><span style="color:#F8F8F2;">/cores(/.*)?                    u:object_r:coredump_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># Wallpaper file for other users</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/system/users/[0-9]+/wallpaper		u:object_r:wallpaper_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># efs files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/efs(/.*)?		u:object_r:efs_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># Cache files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/cache(/.*)?		u:object_r:cache_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/cache/.*\\.data	u:object_r:cache_backup_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/cache/.*\\.restore	u:object_r:cache_backup_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"># LocalTransport (backup) uses this directory</span></span>
<span class="line"><span style="color:#F8F8F2;">/cache/backup(/.*)?	u:object_r:cache_backup_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># sysfs files</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/devices/platform/nfc-power/nfc_power -- u:object_r:sysfs_nfc_power_writable:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/devices/system/cpu(/.*)?    u:object_r:sysfs_devices_system_cpu:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/power/wake_lock -- u:object_r:sysfs_wake_lock:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/power/wake_unlock -- u:object_r:sysfs_wake_lock:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/kernel/uevent_helper --	u:object_r:usermodehelper:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/sys/module/lowmemorykiller(/.*)? -- u:object_r:sysfs_lowmemorykiller:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">#############################</span></span>
<span class="line"><span style="color:#F8F8F2;"># asec containers</span></span>
<span class="line"><span style="color:#F8F8F2;">/mnt/asec(/.*)?             u:object_r:asec_apk_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/mnt/asec/[^/]+/[^/]+\\.zip  u:object_r:asec_public_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/mnt/asec/[^/]+/lib(/.*)?   u:object_r:asec_public_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;">/data/app-asec(/.*)?        u:object_r:asec_image_file:s0</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br></div></div><h3 id="_6-2-android-中的政策" tabindex="-1">6.2 Android 中的政策 <a class="header-anchor" href="#_6-2-android-中的政策" aria-hidden="true">#</a></h3><p>MAC基本管理单位是TEAC（Type Enforcement Accesc Control）,体现ＴＥＡＣ的东西正好就是我们这里将要介绍的政策。<br><strong>政策文件存在位置:</strong><code>external/sepolicy</code> 在这里我们看到大量的.te文件，其实里面就是TEAC的各种配置。因为程序和文件实在是太多了，所以Android中配置都是基于域和类型来的。也就是在这些.te中你可能经常会看到像下的这句： <code>allow system_server i2c_device:chr_file { open read write ioctl};</code> 上面的这句就是政策文件的一项配置，整个政策文件都是由这样的语句组成的。<br><strong>这样的语句的语法格式是：</strong><br><code>rule_name source_type target_type : class perm_set</code><br> 分开的介绍：</p><p><strong>rule_name:</strong> 主要是allow,allowaudit,dontaudit,neverallow 这里没什么好说就是一种动作，允许或者never允许，其他两个因为很少去用，也没具体查是什么意思<br> **source_type:**指程序或者是程序所属的域（domain） 在相关的.te文件中定义，如system_server这个domain在<code>system_server.te</code>中定义：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">system_server.te:5:type system_server, domain, mlstrustedsubject;</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>**target_type:**指文件或者文件的类型 在相关的.te文件中定义。<br></p><blockquote><p>关于类型定义一会再详细介绍一下。</p></blockquote><br><p><strong>class：</strong><code>这个比较复杂，一会重点介绍</code> **perm_set：**在该类Object Class中所定义的操作。</p><p><code>class</code>这个地方不好理解,其实不知道应该怎么去解释它，可能需要和perm_set结合起来去理解会好一点。下面详细说一下：</p><p>1.cat <code>external/sepolicy/security_classes</code>可以看到如下信息：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;"># Classes marked as userspace are classes</span></span>
<span class="line"><span style="color:#F8F8F2;"># for userspace object managers</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">class security</span></span>
<span class="line"><span style="color:#F8F8F2;">class process</span></span>
<span class="line"><span style="color:#F8F8F2;">class system</span></span>
<span class="line"><span style="color:#F8F8F2;">class capability</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># file-related classes</span></span>
<span class="line"><span style="color:#F8F8F2;">class filesystem</span></span>
<span class="line"><span style="color:#F8F8F2;">class file</span></span>
<span class="line"><span style="color:#F8F8F2;">class dir</span></span>
<span class="line"><span style="color:#F8F8F2;">class fd</span></span>
<span class="line"><span style="color:#F8F8F2;">class lnk_file</span></span>
<span class="line"><span style="color:#F8F8F2;">class chr_file</span></span>
<span class="line"><span style="color:#F8F8F2;">class blk_file</span></span>
<span class="line"><span style="color:#F8F8F2;">class sock_file</span></span>
<span class="line"><span style="color:#F8F8F2;">class fifo_file</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"># network-related classes</span></span>
<span class="line"><span style="color:#F8F8F2;">class socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class tcp_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class udp_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class rawip_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class node</span></span>
<span class="line"><span style="color:#F8F8F2;">class netif</span></span>
<span class="line"><span style="color:#F8F8F2;">class netlink_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class packet_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class key_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class unix_stream_socket</span></span>
<span class="line"><span style="color:#F8F8F2;">class unix_dgram_socket</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>根据SELinux规范，Object Class类型由class关键字申明<br> 2.cat <code>external/sepolicy/access_vectors</code>可以看到如下信息：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;"># Define a common prefix for file access vectors.</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">common file</span></span>
<span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">	ioctl</span></span>
<span class="line"><span style="color:#F8F8F2;">	read</span></span>
<span class="line"><span style="color:#F8F8F2;">	write</span></span>
<span class="line"><span style="color:#F8F8F2;">	create</span></span>
<span class="line"><span style="color:#F8F8F2;">	getattr</span></span>
<span class="line"><span style="color:#F8F8F2;">	setattr</span></span>
<span class="line"><span style="color:#F8F8F2;">	lock</span></span>
<span class="line"><span style="color:#F8F8F2;">	relabelfrom</span></span>
<span class="line"><span style="color:#F8F8F2;">	relabelto</span></span>
<span class="line"><span style="color:#F8F8F2;">	append</span></span>
<span class="line"><span style="color:#F8F8F2;">	unlink</span></span>
<span class="line"><span style="color:#F8F8F2;">	link</span></span>
<span class="line"><span style="color:#F8F8F2;">	rename</span></span>
<span class="line"><span style="color:#F8F8F2;">	execute</span></span>
<span class="line"><span style="color:#F8F8F2;">	swapon</span></span>
<span class="line"><span style="color:#F8F8F2;">	quotaon</span></span>
<span class="line"><span style="color:#F8F8F2;">	mounton</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;"># Define a common prefix for socket access vectors.</span></span>
<span class="line"><span style="color:#F8F8F2;">#</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;">common socket</span></span>
<span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;"># inherited from file</span></span>
<span class="line"><span style="color:#F8F8F2;">	ioctl</span></span>
<span class="line"><span style="color:#F8F8F2;">	read</span></span>
<span class="line"><span style="color:#F8F8F2;">	write</span></span>
<span class="line"><span style="color:#F8F8F2;">	create</span></span>
<span class="line"><span style="color:#F8F8F2;">	getattr</span></span>
<span class="line"><span style="color:#F8F8F2;">	setattr</span></span>
<span class="line"><span style="color:#F8F8F2;">	lock</span></span>
<span class="line"><span style="color:#F8F8F2;">	relabelfrom</span></span>
<span class="line"><span style="color:#F8F8F2;">	relabelto</span></span>
<span class="line"><span style="color:#F8F8F2;">	append</span></span>
<span class="line"><span style="color:#F8F8F2;"># socket-specific</span></span>
<span class="line"><span style="color:#F8F8F2;">	bind</span></span>
<span class="line"><span style="color:#F8F8F2;">	connect</span></span>
<span class="line"><span style="color:#F8F8F2;">	listen</span></span>
<span class="line"><span style="color:#F8F8F2;">	accept</span></span>
<span class="line"><span style="color:#F8F8F2;">	getopt</span></span>
<span class="line"><span style="color:#F8F8F2;">	setopt</span></span>
<span class="line"><span style="color:#F8F8F2;">	shutdown</span></span>
<span class="line"><span style="color:#F8F8F2;">	recvfrom</span></span>
<span class="line"><span style="color:#F8F8F2;">	sendto</span></span>
<span class="line"><span style="color:#F8F8F2;">	recv_msg</span></span>
<span class="line"><span style="color:#F8F8F2;">	send_msg</span></span>
<span class="line"><span style="color:#F8F8F2;">	name_bind</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><p>SELinux规范中，定义perm set有两种方式:</p><ol><li>common common_name { permission_name ... } common定义的perm set能被另外一种perm set命令class所继承</li><li>class class_name [ inherits common_name ] { permission_name ... } inherits表示继承了某个common定义的权限 注意，class命令定义的权限其实针对得就是某个object class。它不能被其他class继承</li></ol><p>下面用例子说明一下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">common file {</span></span>
<span class="line"><span style="color:#F8F8F2;">      ioctl read write create getattr setattr lock relabelfrom relabelto</span></span>
<span class="line"><span style="color:#F8F8F2;">      append unlink link rename execute swapon quotaon mounton }</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">class dir inherits file {</span></span>
<span class="line"><span style="color:#F8F8F2;">   add_name  remove_name reparent search rmdir open audit_access execmod</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_6-3-类型定义" tabindex="-1">6.3 类型定义 <a class="header-anchor" href="#_6-3-类型定义" aria-hidden="true">#</a></h3><p>类型定义通过type 来进行<br><strong>type命令的完整格式为：</strong><code>type type_id [alias alias_id,] [attribute_id]</code> 其中，方括号中的内容为可选。alias指定了type的别名，可以指定多个别名。 下面这个例子定义了一个名为shell的type，它和一个名为domain的属性（attribute）关联 : <code>type shell, domain;</code></p><p>属性由<code>attribute</code>关键字定义，如attributes文件中定义的SEAndroid使用的属性有：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">attribute domain</span></span>
<span class="line"><span style="color:#F8F8F2;">attribute file_type</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>可以在定义type的时候，直接将其和某个attribute关联，也可以单独通过<code>typeattribue</code>将某个type和某个或多个attribute关联起来，如下面这个例子<br> 将前面定义的system类型和mlstrustedsubject属性关联了起来 <code>typeattribute system mlstrustedsubject</code><br><strong>这里需要重点说明一下<code>attribute</code>这个东西</strong> 这里的<code>attribute</code>正确的意思不是属性，而是**<code>群组</code>**的意思。请注意！！！</p><p><code>attribute</code>的作用通过如下的例子来说明：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">#定义两个type，分别是A_t和B_t，它们都管理到attribute_test</span></span>
<span class="line"><span style="color:#F8F8F2;">type A_t attribute_test;</span></span>
<span class="line"><span style="color:#F8F8F2;">type B_t attribute_test;</span></span>
<span class="line"><span style="color:#F8F8F2;"> </span></span>
<span class="line"><span style="color:#F8F8F2;">#写一个allow语句，直接针对attribute_test</span></span>
<span class="line"><span style="color:#F8F8F2;">allow attribute_test C_t:file {read write};</span></span>
<span class="line"><span style="color:#F8F8F2;">#上面这个allow语句在编译后的安全策略文件中会被如下两条语句替代：</span></span>
<span class="line"><span style="color:#F8F8F2;">allow A_t C_t:file {read write};</span></span>
<span class="line"><span style="color:#F8F8F2;">allow B_t C_t:file {read write};</span></span>
<span class="line"><span style="color:#F8F8F2;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><hr><h2 id="_7-如何快速添加一安全性规则" tabindex="-1">7.如何快速添加一安全性规则 <a class="header-anchor" href="#_7-如何快速添加一安全性规则" aria-hidden="true">#</a></h2><ol><li>首先确认你要解的问题的中是那个<code>进程</code>要访问那个<code>文件</code></li><li>由于进程已经存在那个它安全性文本的定义肯定是存在只要找到就行类似这样一条语句<code>u:r:kernel:s0</code></li><li>确认一下文件的安全性文本的定义是否存在，如果不存在则要定义（一般情况下是不存在）,3.1定义类型(参考6.3)3.2在contexts定义安全性文本（参考6.2）</li><li>确认要进行那种操作也就是要确定class和perm_set.</li><li>在相关的.te文件加入规则也就是一条allow相关的语句(参考6.2)。</li></ol><p>例子： 如我们在system_server中加入一个服务，这个服务要操作/dev/i2c-2这个设备结点。 那么安上面的方法：</p><ol><li>确认问题：<code>system_server</code>要访问<code>/dev/i2c-2</code></li><li>确定进程<code>system_server</code>信息<code>u:r:system_server:s0 system 849 232 system_server</code></li><li>由于<code>/dev/i2c-2</code>的安全性文本不存在，所以我们做定义3.1,<code>type i2c2_device, dev_type;</code>3.2,<code>/dev/i2c-2 u:object_r:i2c2_device:s0</code></li><li>确认<code>calss　perm_set</code>为<code>chr_file　{open read write ioctl} </code></li><li>加入规则<code>allow system_server i2c2_device:chr_file { open read write ioctl};</code></li></ol><p>注意：以上信息要写入合适的文件，要以当时的问题来决定。</p><hr>`,82)),o(a,{title:n.$title},null,8,["title"])])}const h=l(F,[["render",b]]);export{f as __pageData,h as default};
