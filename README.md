## 3주차 1번째 과제(검색기능) 구현사항

</br>

# 메인페이지

</br>

- ### API호출 횟수를 줄이기 위해서 로컬스토리지 활용하기

```javascript
//Search.js
const fetchData = () => {
    return fetch('http://localhost:4000/sick')
      .then(res => res.json())
      .then(data => {
        if (data) {
          localStorage.setItem('api', JSON.stringify(data));
        }
        console.info('calling api');
      });
  };
```

```javascript
//Search.js
useEffect(() => {
    fetchData();
    const DeleteCache = setTimeout(() => {
      localStorage.removeItem('api');
    }, 20000);
  }, []);
```

API 데이터를 로컬스토리지에 담고 20초가 지나면 다시 삭제되게 구현하였습니다.


</br>

- ### 이슈목록에 필요한 요소만 이슈 아이템으로 보내기

```javascript
//Search.js
 {search.sickNm.split(keyword)[0]}
   <span style={{ fontWeight: 'bold' }}>{keyword}</span>
 {search.sickNm.split(keyword)[1]}
```

처음에 input창에 적은 텍스트와 같은 문자는 다 볼드 처리를 하기 위해 이렇게 만들었습니다.
그러나 앞 글자가 같아야 오게 하는 로직으로 변경시에도 작동하지만 split으로 나눌 필요는 사라집니다.

</br>

- ### 마우스로 이동구현

```javascript
//Search.js
const keyboardNavigation = useCallback(
    e => {
      if (e.key === 'ArrowDown') {
        isShowing &&
          setCursor(prev => (prev < keyItems.length - 1 ? prev + 1 : prev));
        setSelected(keyItems[cursor + 1].sickNm);
      }
      if (e.key === 'ArrowUp') {
        isShowing && setCursor(prev => (prev > 0 ? prev - 1 : 0));
        setSelected(keyItems[cursor - 1].sickNm);
      }
      if (e.key === 'Escape') {
        setCursor(-1);
      }
      if (e.key === 'Enter') {
        setSelected(keyItems[cursor].sickNm);
        window.location.href = `/?q=${selected}`;
      }
    },
    [keyItems, isShowing, setCursor, setIsShowing, cursor]
  );
```

마우스로 검색창의 자동완성에서 이동할 수 있도록 구현했습니다. 




