---
title: Vue 3 中令人兴奋的新功能
tags: 学习
author: zyh
--- 

> Vue 3 目前已经公布next版本，也有很多人已经尝鲜，写了一些demo用例，下文主要介绍了Vue 3 中的一些新功能

## 组件 API（Composition API）

组件 API 是 Vue 的下一个主要版本中最常用的讨论和特色语法。这是一种全新的逻辑重用和代码组织方法。

当前，我们使用所谓的 Options API 构建组件。为了向 Vue 组件添加逻辑，我们填充（可选）属性，例如 `data`、`methods`、`computed`等。这种方法的最大缺点是其本身并不是有效的 JavaScript 代码。你需要确切地知道模板中可以访问哪些属性以及 `this` 关键字的行为。在后台，Vue 编译器需要将此属性转换为工作代码。因此我们无法从自动建议或类型检查中受益。

组件 API 旨在通过将组件属性中当前可用的机制公开为 JavaScript 函数来解决这个问题。 Vue 核心团队将组件 API 描述为 *“一组基于函数的附加 API，可以灵活地组合组件逻辑。”* 用组件 API 编写的代码更具有可读性，并且其背后没有任何魔力，因此更易于阅读和学习。

让我们通过一个用了新的组件 API 的组件的简单示例，来了解其工作原理。

```js
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}, click to increment.
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => console.log('component mounted!'))

    return {
      count,
      double,
      increment
    }
  }
}
</script>
```

现在，让我们把代码分解为几部分，来了解发生了些什么：

```js
import { ref, computed, onMounted } from 'vue'
```

正如我之前提到的，组件 API 将组件属性公开为函数，因此第一步是导入所需的函数。在例子中，需要使用 `ref` 创建响应性引用，用 `computed` 建立计算属性，并用 `onMounted` 访问安装的生命周期 hook。

现在你可能很想知道这神秘的 `setup` 方法到底是什么？

```js
export default {
  setup() {
```

简而言之，它只是一个将属性和函数返回到模板的函数而已。我们在这里声明所有响应性属性、计算属性、观察者和生命周期 hook，然后将它们返回，以便可以在模板中使用它们。

我们不从 `setup` 函数返回的内容在模板中将会不可用。

```js
const count = ref(0)
```

根据上面的内容，我们声明了带有 `ref` 函数的名为 `count` 的响应属性。它可以包装任何原语或对象并返回其响应性引用。传递的元素的值将会保留在所创建引用的 `value` 属性中。例如，如果你想访问 `count` 引用的值，则需要明确要求 `count.value`。

```js
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}
```

这正是我们在声明计算属性 `double` 和 `increment` 函数时所要做的。

```js
onMounted(() => console.log('component mounted!'))
```

使用 `onMounted` hook，我们会在安装组件时记录一些消息，只是向你展示可以做到！😉

```js
return {
  count,
  double,
  increment
}
```

最后，我们将使用 `increment` 方法返回 `count` 和 `double` 属性，以使它们在模板中可用。

```js
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}. Click to increment.
  </button>
</template>
```

瞧！现在我们可以访问模板中 `setup` 方法返回的属性和函数，就像通过旧的 Options API 声明它们一样。

这是一个简单的例子，也可以通过 Options API 轻松实现。新的组件 API 的真正好处不仅在于能以不同的方式进行编码，在对我们的代码和逻辑进行重用时，这些好处也能显示出来。

### 用组件 API 进行代码重用

新的组件 API 具有更多优点。考虑一下代码重用。目前如果我们要在其他组件之间共享一些代码，则有两个可用的选择：mixins 和作用域插槽（ scoped slots）。但是两者都有缺点。

假设我们要提取 `counter` 中的功能并在其他组件中重用。在下面，你可以看到如何将其与可用的 API 和新的组件 API 结合使用：

让我们从 mixins 开始：

```js
import CounterMixin from './mixins/counter'

export default {
  mixins: [CounterMixin]
}
```

mixins 的最大缺点在于我们对它实际上添加到组件中的行为一无所知。这不仅使代码变得难以理解，而且还可能导致名称与现有属性和函数发生冲突。

下面是作用域插槽：

```js
<template>
  <Counter v-slot="{ count, increment }">
     {{ count }}
    <button @click="increment">Increment</button> 
  </Counter> 
</template>
```

通过使用作用域插槽，我们确切地知道可以通过 `v-slot` 属性访问了哪些属性，因此代码更容易理解。这种方法的缺点是我们只能在模板中访问它，并且只能在 `Counter` 组件作用域内使用。

现在该用组件 API 了：

```js
function useCounter() {
  const count = ref(0)
  function increment () { count.value++ }

  return {
    count,
    incrememt
  }
}

export default {
  setup () {
    const { count, increment } = useCounter()
    return {
      count,
      increment
    }
  }
}
```

是不是更优雅？我们不受模板和组件作用域的限制，并且能够确切地知道可以从 counter 访问哪些属性。另外我们可以受益于编辑器中可用的代码补全功能，因为 `useCounter` 只是一个返回某些属性的函数，因此编辑器可以帮助我们进行类型检查和建议。

这也是使用第三方库的更优雅的方式。例如，如果我们想使用 Vuex，则可以显式地使用 `useStore` 函数，而不是污染 Vue 原型（`this.$store`）。这种方法也消除了 Vue 插件的幕后魔力。

```js
const { commit, dispatch } = useStore()
```

如果你想了解有关组件 API 及其使用案例的更多信息，我强烈建议你阅读 Vue 团队的[这篇文章](https://vue-composition-api-rfc.netlify.com/)，其中解释了新 API 背后的原因，并提出了最好的用例建议。还有 [great repository](https://github.com/LinusBorg/composition-api-demos) ，其中包含来自 Vue 核心团队的 Thorsten Lünborg 使用的组件 API 的例子。

## 全局挂载/配置 API 更改

我们可以在实例化和配置程序的方式中找到另一个重大变化。让我们看看它现在是如何工作的：

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

当前，我们正在用全局 `Vue` 对象提供所有配置并创建新的 Vue 实例。对 `Vue` 对象所做的任何更改都会影响每个 Vue 实例和组件。

现在，让我们看看它如何在 Vue 3 中运行：

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.ignoredElements = [/^app-/]
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.mount('#app')
```

你可能已经注意到，每个配置都限于使用 `createApp` 定义的某个 Vue 程序。

它可以使你的代码更易于理解，并且不易出现由第三方插件引发的意外问题。目前，如果某些第三方解决方案正在修改 Vue 对象，那么它可能会以意想不到的方式（尤其是全局混合）影响你的程序，而 Vue 3 则没有这个问题。

目前，此 API 的更改正在 [这个 RFC](https://github.com/vuejs/rfcs/pull/29) 中进行讨论，这意味着将来可能会有所更改。

## 片段（Fragments）

我们可以在 Vue 3 中期待的另一个激动人心的附加功能是片段。

你可能会问什么片段？好吧，如果你创建了一个 Vue 组件，那么它只能有一个根节点。

这意味着无法创建这样的组件：

```js
<template>
  <div>Hello</div>
  <div>World</div>
</template>
```

原因是代表任何 Vue 组件的 Vue 实例都需要绑定到单个 DOM 元素中。创建具有多个 DOM 节点的组件的唯一方法是创建一个没有基础 Vue 实例的功能组件。

事实证明，React 社区也有同样的问题。他们提出的解决方案是一个名为 Fragment 的虚拟元素。看上去是这样的；

```js
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

尽管 Fragment 看起来像是普通的 DOM 元素，但它是虚拟的，根本不会在 DOM 树中渲染。这样我们就可以将组件功能绑定到单个元素中，而无需创建冗余的 DOM 节点。

现在你可以在带有 [vue-fragments](https://vuejsdevelopers.com/2018/09/11/vue-multiple-root-fragments/) 库的 Vue 2 中使用片段，而在 Vue 3 中你可以直接使用它！

## Suspense

将被用在 Vue 3 中的另一个从 React 学来的功能是 Suspense 组件。

Suspense 能够暂停你的组件渲染，并渲染后备组件，直到条件满足为止。在 Vue London 期间，尤雨溪简短地谈到了这个主题，并向我们展示了可以期望的 API。事实证明，Suspense 只是带有插槽的组件：

```js
<Suspense>
  <template >
    <Suspended-component />
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

直到 `Suspended-component` 完全渲染前将会显示后备内容。挂起可以等待，直到该组件被下载（如果该组件是异步组件的话），或者在 `setup` 函数中执行一些异步操作。

## Multiple v-models

V-model 是一种指令，可用于在给定组件上实现双向绑定。我们可以传递响应性属性，并从组件内部对其进行修改。

我们可以从表单元素上很好的了解 `v-model`：

```js
<input v-bind="property />
```

但是你知道可以对每个组件都使用 `v-model` 吗？在内部， `v-model` 只是传递 `value` 属性和侦听 `input` 事件的捷径。把上面的例子重写为以下语法，将具有完全相同的效果：

```js
<input 
  v-bind:value="property"
  v-on:input="property = $event.target.value"
/>
```

我们甚至可以用组件 `model` 属性来更改默认属性和事件的名称：

```js
model: {
  prop: 'checked',
  event: 'change'
}
```

如你所见，如果我们想要在组件中进行双向绑定，`v-model` 指令可能是一个非常有用的语法。不幸的是，每个组件只能有一个 `v-model`。

幸运的是，这在 Vue 3 中不会有问题！你将能够给 `v-model` 属性名，并根据需要拥有尽可能多的属性名。在下面的例子中，你可以在表单组件中找到两个 `v-model`：

```js
<InviteeForm
  v-model:name="inviteeName"
  v-model:email="inviteeEmail"
/>
```

目前，此 API 的更改已在[这个 RFC](https://github.com/vuejs/rfcs/pull/31) 中进行讨论，这意味着将来可能会有更改。

## Portals

Portals 是特殊的组件，用来在当前组件之外渲染某些内容。它也是[在 React 中实现](https://pl.reactjs.org/docs/portals.html)的功能之一。这就是 React 文档关于 Portals 的内容：

“*Portals 提供了一种独特的方法来将子级渲染到父组件的 DOM 层次结构之外的 DOM 节点中。*”

这种处理模式，是弹出式窗口以及通常显示在页面顶部的组件所使用的一种非常好的方法。通过使用 Portals，你可以确保没有任何主机组件 CSS 规则会影响你要显示的组件，并且可以避免用 `z-index` 进行的黑客攻击。

对于每个 Portal，我们需要为其指定目标位置，在该目标位置将渲染 Portals 内容。在下面，你可以从 [portal-vue](https://github.com/LinusBorg/portal-vue) 库中看到实现，该库将此功能添加到了 Vue 2：

```js
<portal to="destination">
  <p>This slot content will be rendered wherever thportal-target with name 'destination'
    is  located.</p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component wilbe rendered here.
  -->
</portal-target>
```

Vue 3 对 Portals 提供开箱即用的支持！

## 新的自定义指令 API

自定义指令 API 在 Vue 3 中将略有变化，以便更好地与组件生命周期保持一致。这项改进应使 API 更加直观，从而使新手更容易理解和学习 API。

这是当前的自定义指令 API：

```js
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
}
```

这是在 Vue 3 中的样子。

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

即使这是一项重大改进，也应很容易被 Vue 兼容版本涵盖到。