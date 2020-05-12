export default function isTimeOverlapped(t1, t2) {
    const { start: t1Start, end: t1End } = t1
    const { start: t2Start, end: t2End } = t2
    const isT1ContainT2 = t1Start < t2Start && t1End > t2End
    const isT2ContainT1 = t2Start < t1Start && t2End > t1End
    const isT1StartOverlapToT2End = t1Start < t2End && t1End > t2End
    const isT1EndOverlapToT2Start = t2Start < t1End && t2End > t1End
    const isOverlapped =
        isT1ContainT2 ||
        isT2ContainT1 ||
        isT1StartOverlapToT2End ||
        isT1EndOverlapToT2Start
    return isOverlapped
}
