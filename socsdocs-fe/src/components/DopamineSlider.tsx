import useDopamineStore from "../store/useDopamineStore";

export function Slider() {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const value = useDopamineStore((state) => state.level);

    return (
        <>

        <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>

            <input
            id="dopamine-slider"
            type="range"
            min={1}
            max={5}
            value={value}
            onChange={(e) => {
                const newValue = Number(e.target.value);
                setLevel(newValue);
            }}
            />
        </div>

        </>
    );
}

export default Slider;