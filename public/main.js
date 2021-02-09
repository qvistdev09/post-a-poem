(() => {
  var e = {
      814: (e, t, o) => {
        const { createElementsMaker: s } = o(622);
        class n {
          constructor(e, t, o, n, r) {
            (this.paletteDiv = document.getElementById(e)),
              (this.composedPoemDiv = document.getElementById(t)),
              (this.submittedPoemsDiv = document.getElementById(o)),
              (this.fetcher = n),
              (this.templates = r),
              (this.maker = s(r)),
              this.paletteDiv.addEventListener('click', e => {
                this.handleClick(e);
              }),
              this.composedPoemDiv.addEventListener('click', e => {
                this.handleClick(e);
              });
          }
          clearContainer(e) {
            [...e.children].forEach(t => {
              e.removeChild(t);
            });
          }
          handleClick(e) {
            const t = e.target.getAttribute('class');
            t === this.templates.paletteBtn.class
              ? this.addWord(e.target)
              : t === this.templates.addedWordBtn.buttonClass &&
                this.removeWord(e.target);
          }
          renderPoems() {
            this.clearContainer(this.submittedPoemsDiv),
              this.fetcher.getPoems((e, t) => {
                if (e) console.log('Error getting poems');
                else
                  for (let e of t) {
                    const t = this.maker.submittedPoem(e);
                    this.submittedPoemsDiv.appendChild(t);
                  }
              });
          }
          generatePalette() {
            this.clearContainer(this.paletteDiv),
              this.fetcher.getWords((e, t) => {
                if (e) console.log('Failed getting words');
                else
                  for (const e of t) {
                    const t = this.maker.paletteBtn(e);
                    this.paletteDiv.appendChild(t);
                  }
              });
          }
          encodePoem() {
            let e = '';
            return (
              [
                ...this.composedPoemDiv.getElementsByClassName(
                  this.templates.poemRow.divClass
                ),
              ].forEach(t => {
                (e += `<${t.style.marginLeft.replace('rem', '')}>`),
                  [...t.children].forEach(t => {
                    const o = t
                        .querySelector(
                          `.${this.templates.addedWordBtn.connectorDivClass}`
                        )
                        .style.width.replace('rem', ''),
                      s = t.style.transform
                        .match(/(?<=\()[^\(\)]+(?=\))/)[0]
                        .replace('%', ''),
                      n = t.querySelector('button').getAttribute('data-word');
                    e += `{${o};${s};${n}}`;
                  });
              }),
              e
            );
          }
          submitPoem() {
            const e = this.encodePoem();
            this.fetcher.submitPoem(e, (e, t) => {
              this.clearContainer(this.submittedPoemsDiv),
                this.clearContainer(this.composedPoemDiv),
                this.renderPoems(),
                this.generatePalette();
            });
          }
          getAvailableRow() {
            const e = this.composedPoemDiv.getElementsByClassName(
              this.templates.poemRow.divClass
            );
            for (let t of e) if (t.children.length < 3) return t;
            return null;
          }
          addWord(e) {
            e.setAttribute('disabled', 'true');
            const t = this.maker.addedWordBtn(e.textContent),
              o = this.getAvailableRow();
            if (null !== o) o.appendChild(t);
            else {
              const e = this.maker.poemRow();
              e.appendChild(t), this.composedPoemDiv.appendChild(e);
            }
          }
          removeWord(e) {
            document
              .getElementById(
                e.getAttribute('data-word') + this.templates.paletteBtn.suffix
              )
              .removeAttribute('disabled');
            const t = e.closest(`.${this.templates.poemRow.divClass}`);
            1 === t.children.length
              ? t.parentElement.removeChild(t)
              : t.removeChild(e.parentElement);
          }
        }
        e.exports.create = (e, t, o, s, r) => new n(e, t, o, s, r);
      },
      622: (e, t, o) => {
        const s = o(801);
        e.exports = {
          createElementsMaker: e => {
            const t = s.addedWordBtn(e.addedWordBtn),
              o = s.paletteBtn(e.paletteBtn),
              n = s.poemRow(e.poemRow),
              r = s.submittedPoemContainer(e.submittedPoemContainer),
              d = s.submittedWordDiv(e.submittedWordDiv);
            return {
              addedWordBtn: t,
              paletteBtn: o,
              poemRow: n,
              submittedPoemContainer: r,
              submittedWordDiv: d,
              submittedPoem: s.submittedPoem(r, n, d, e),
            };
          },
        };
      },
      475: e => {
        class t {
          constructor(e, t, o, s) {
            (this.words = e + t), (this.poems = e + o), (this.submit = e + s);
          }
          genericFetch(e, t) {
            fetch(e)
              .then(e => e.json())
              .then(e => {
                t(null, e);
              })
              .catch(e => {
                t(e, null);
              });
          }
          getWords(e) {
            this.genericFetch(this.words, e);
          }
          getPoems(e) {
            fetch(this.poems)
              .then(e => e.json())
              .then(t => {
                e(null, t);
              })
              .catch(e => {
                throw e;
              });
          }
          submitPoem(e, t) {
            fetch(this.submit, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ input: e }),
            })
              .then(e => e.json())
              .then(e => {
                t(null, e);
              })
              .catch(e => {
                t(e, null);
              });
          }
        }
        e.exports.create = (e, o, s, n) => new t(e, o, s, n);
      },
      185: e => {
        const t = (e, t) => {
            const o = Math.floor(101 * Math.random()) / 100;
            return e * o < t ? t : e * o;
          },
          o = (e, t) => Math.floor(Math.random() * (t - e + 1)) + e;
        e.exports = {
          randomize: t,
          randomInt: o,
          setSeveralAttributes: (e, t) => {
            Object.keys(t).forEach(o => {
              e.setAttribute(o, t[o]);
            });
          },
          setRandomHeight: (e, t, s) => {
            const n = o(t, s);
            e.style.transform = `translateY(${n}%)`;
          },
          addTextNode: (e, t) => {
            const o = document.createTextNode(t);
            e.appendChild(o);
          },
          setRandomWidth: (e, o, s) => {
            const n = t(o, s);
            e.style.width = `${n}rem`;
          },
          formatDate: e => {
            const t = new Date(e);
            return (
              console.log(typeof t.getMinutes()),
              t.getDate() +
                '-' +
                (t.getMonth() + 1) +
                '-' +
                t.getFullYear() +
                ' ' +
                t.getHours() +
                ':' +
                (t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes())
            );
          },
        };
      },
      805: (e, t, o) => {
        const s = o(185);
        e.exports = e => {
          const t = document.getElementById(e.templateId);
          return o => {
            const n = t.content.cloneNode(!0),
              r = n.querySelector(`.${e.containerDivClass}`),
              d = n.querySelector(`.${e.buttonClass}`),
              i = n.querySelector(`.${e.connectorDivClass}`);
            return (
              s.setRandomHeight(r, -15, 15),
              s.setSeveralAttributes(d, { id: o + e.suffix, 'data-word': o }),
              s.addTextNode(d, o),
              s.setRandomWidth(i, 4, 0.8),
              n.children[0]
            );
          };
        };
      },
      959: (e, t, o) => {
        const s = o(185);
        e.exports = e => {
          const t = document.getElementById(e.templateId);
          return o => {
            const n = t.content.cloneNode(!0),
              r = n.querySelector(`.${e.class}`);
            return (
              s.addTextNode(r, o),
              s.setSeveralAttributes(r, { id: o + e.suffix, 'data-word': o }),
              n.children[0]
            );
          };
        };
      },
      976: (e, t, o) => {
        const s = o(185);
        e.exports = e => {
          const t = document.getElementById(e.templateId);
          return o => {
            const n = o || s.randomize(5, 0),
              r = t.content.cloneNode(!0);
            return (
              (r.querySelector(`.${e.divClass}`).style.marginLeft = `${n}rem`),
              r.children[0]
            );
          };
        };
      },
      795: (e, t, o) => {
        const s = o(185);
        e.exports = e => {
          const t = document.getElementById(e.templateId);
          return o => {
            const n = t.content.cloneNode(!0),
              r = n.querySelector(`.${e.h3Class} span`);
            return s.addTextNode(r, o), n.children[0];
          };
        };
      },
      214: (e, t, o) => {
        const s = o(185);
        e.exports = (e, t, o, n) => r => {
          const d = s.formatDate(r.created),
            i = e(d),
            a = i.querySelector(`.${n.submittedPoemContainer.innerDivClass}`);
          for (let e of r.rows) {
            const s = t(e.margin);
            for (let t of e.words) {
              const e = o(t.word, t.connector, t.height);
              s.appendChild(e);
            }
            a.appendChild(s);
          }
          return i;
        };
      },
      163: (e, t, o) => {
        const s = o(185);
        e.exports = e => {
          const t = document.getElementById(e.templateId);
          return (o, n, r) => {
            const d = t.content.cloneNode(!0);
            (d.querySelector(
              `.${e.divClass}`
            ).style.transform = `translateY(${r}%)`),
              (d.querySelector(
                `.${e.connectorDivClass}`
              ).style.width = `${n}rem`);
            const i = d.querySelector(`.${e.innerParagraphClass}`);
            return s.addTextNode(i, o), d.children[0];
          };
        };
      },
      801: (e, t, o) => {
        e.exports = {
          addedWordBtn: o(805),
          paletteBtn: o(959),
          poemRow: o(976),
          submittedPoemContainer: o(795),
          submittedWordDiv: o(163),
          submittedPoem: o(214),
        };
      },
      180: e => {
        'use strict';
        e.exports = JSON.parse(
          '{"paletteBtn":{"templateId":"palette-btn-template","class":"palette-btn","suffix":"-add"},"addedWordBtn":{"templateId":"added-word-btn-template","containerDivClass":"added-word-btn-container-div","connectorDivClass":"connector-div","buttonClass":"added-word-btn","closeIconClass":"added-word-btn-close-icon","suffix":"-rm"},"poemRow":{"templateId":"poem-row-template","divClass":"poem-row-div"},"submittedPoemContainer":{"templateId":"submitted-poem-container-template","divClass":"submitted-poem-container-div","h3Class":"label","innerDivClass":"labelled-container"},"submittedWordDiv":{"templateId":"submitted-word-div-template","divClass":"submitted-word-div","connectorDivClass":"connector-div","innerParagraphClass":"submitted-word"}}'
        );
      },
    },
    t = {};
  function o(s) {
    if (t[s]) return t[s].exports;
    var n = (t[s] = { exports: {} });
    return e[s](n, n.exports, o), n.exports;
  }
  (() => {
    const e = o(475).create('/api/', 'words', 'poems', 'poems'),
      t = o(180),
      s = o(814).create(
        'word-palette',
        'composed-poem',
        'submitted-poems',
        e,
        t
      );
    document.getElementById('submit-poem-btn').addEventListener('click', () => {
      s.submitPoem();
    }),
      s.generatePalette(),
      s.renderPoems();
  })();
})();
