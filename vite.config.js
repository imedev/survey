import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import md from 'vite-plugin-md';
import yaml from '@rollup/plugin-yaml';
import path from 'path';
import hljs from 'highlight.js';
import styleImport, { VantResolve } from 'vite-plugin-style-import';


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		md({
			wrapperComponent: 'DocsWrapper',
			markdownItOptions: {
				highlight(str, lang) {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return hljs.highlight(str, { language: lang }).value;
						} catch (err) {
							// eslint-disable-next-line no-console
							console.warn('There was an error highlighting in Markdown');
							// eslint-disable-next-line no-console
							console.error(err);
						}
					}

					return '';
				},
			},
			markdownItSetup(md) {
				md.use(require('markdown-it-table-of-contents'), { includeLevel: [2] });
				md.use(require('markdown-it-anchor'), { permalink: true, permalinkSymbol: '#' });

				function hintRenderer(type) {
					return (tokens, idx) => {
						const token = tokens[idx];
						let title = token.info.trim().slice(type.length).trim() || '';

						if (title) title = `<div class="hint-title">${title}</div>`;

						if (token.nesting === 1) {
							return `<div class="${type} hint">${title}\n`;
						} else {
							return '</div>\n';
						}
					};
				}

				md.use(require('markdown-it-container'), 'tip', { render: hintRenderer('tip') });
				md.use(require('markdown-it-container'), 'warning', { render: hintRenderer('warning') });
				md.use(require('markdown-it-container'), 'danger', { render: hintRenderer('danger') });

				md.core.ruler.push('router-link', (state) => {
					state.tokens.forEach((token) => {
						if (token.type === 'inline') {
							const inlineTokens = token.children;

							let isTraversingLink = false;
							for (let i = 0; i < inlineTokens.length; i++) {
								if (isTraversingLink && inlineTokens[i].type === 'link_close') {
									inlineTokens[i].tag = 'router-link';

									isTraversingLink = false;
								} else if (inlineTokens[i].type === 'link_open') {
									const href = inlineTokens[i].attrs.find((attr) => attr[0] === 'href');

									if (href) {
										if (href[1].startsWith('http')) {
											inlineTokens[i].attrs.push(['target', '_blank']);
											inlineTokens[i].attrs.push(['rel', 'noopener noreferrer']);
										} else if (!href[1].startsWith('#')) {
											inlineTokens[i].tag = 'router-link';
											inlineTokens[i].attrs = [['to', `/docs${href[1]}`]];

											isTraversingLink = true;
										}
									}
								}
							}
						}
					});
				});
			},
			transforms: {
				before(code) {
					const titleRegex = /^# ([^\n]+?)( <small><\/small>)?\n/m;

					const titleLine = code.match(titleRegex);

					const title = titleLine?.[1] ?? null;
					const modularExtension = Boolean(titleLine?.[2]);
					const codeWithoutTitle = code.replace(titleRegex, '');

					const newCode = `---\ntitle: "${title}"\nmodularExtension: ${modularExtension}${
						code.startsWith('---\n') ? codeWithoutTitle.substring(3) : `\n---\n\n${codeWithoutTitle}`
					}`;

					return newCode;
				},
			},
		}),
		yaml({
			transform(data) {
				return data === null ? {} : undefined;
			},
		}),
		styleImport({
			resolves: [VantResolve()],
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	base: process.env.NODE_ENV === 'production' ? '' : '',
	server: {
		port: 8080,

		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), ''],
		},
	},
});

