[toc]

# Monorepo

你所需要了解的关于 Monorepo 的一切，以及业界构建 Monorepo 的工具。

## 1. 前言

Monorepo 现在可谓是相当的热门，尤其是在 Web 开发者中。

本文的目的就是为了帮助开发人员了解 Monorepo 是什么，它具有哪些优势，能带来什么好处，以及详细介绍业界能够便捷和高效的构建 Monorepo 的工具。

业界已经有许多优秀的 Monorepo 工具，这些工具分别由不同的团队打造，具有不同的理念。本文将尽最大努力来客观地阐述每种工具，如果有任何的错误，欢迎指出！

本文关注的 Monorepo 工具有：Bazel（Google 出品）、Gradle Build Tool（Gradle 出品）、Lage（Microsoft 出品）、Lerna、Nx（Nrwl 出品）、Rush（Microsoft 出品）和 Turborepo（Vercel 出品）。

> 选择依据：在 Web 开发社区中的受欢迎程度。

## 2. 什么是 Monorepo

Monorepo 是指包含多个不同项目的单个仓库，且这些项目之间具有良好的关系。

总览业界稳定运行的 Monorepo 工具，这应是对 Monorepo 最一致、最准确的陈述。

### 2.1 不仅仅是 “代码托管”

如果一个仓库中包含着多个项目，那么这个仓库一定起着 “代码托管” 能力的作用，但是如果这些项目之间没有良好的关系，仅仅是堆砌在一起，那么并不能称这个仓库为 Monorepo。

同样，如果一个仓库包含一个大规模的应用程序，而没有对可复用部分进行封装和拆分，那么它只是一个很大的仓库。你可以给它起个别致的名字，比如 “garganturepo”，但很抱歉，它不是 Monorepo。

通常大家谈到 Monorepo 时首先想到的就是这样的仓库将会是一个巨石应用 (Monolith)，真的是这样吗？继续阅读，你会发现一个好的 Monorepo 与巨石应用有着天壤之别。











































