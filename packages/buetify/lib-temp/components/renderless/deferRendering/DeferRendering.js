import { shallowRef, onMounted, defineComponent } from 'vue';
export const DeferRendering = defineComponent({
    name: 'defer-rendering',
    props: {
        frames: {
            type: Number,
            required: true
        }
    },
    setup(props, { slots }) {
        const currentFrame = shallowRef(0);
        function checkRenderingStatus() {
            if (props.frames > 0) {
                if (window && window.requestAnimationFrame) {
                    const step = () => {
                        requestAnimationFrame(() => {
                            if (currentFrame.value < props.frames) {
                                currentFrame.value++;
                                step();
                            }
                        });
                    };
                    step();
                }
                else {
                    setTimeout(() => (currentFrame.value = props.frames), props.frames * 16);
                }
            }
        }
        onMounted(checkRenderingStatus);
        return () => {
            if (currentFrame.value >= props.frames) {
                return slots.default();
            }
            else {
                return undefined;
            }
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmZXJSZW5kZXJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZW5kZXJsZXNzL2RlZmVyUmVuZGVyaW5nL0RlZmVyUmVuZGVyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUU3RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDO0lBQzVDLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0Y7SUFDRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFO1FBQ3BCLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxTQUFTLG9CQUFvQjtZQUMzQixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMscUJBQXFCLEVBQUU7b0JBQzFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTt3QkFDaEIscUJBQXFCLENBQUMsR0FBRyxFQUFFOzRCQUN6QixJQUFJLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQ0FDckMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dDQUNyQixJQUFJLEVBQUUsQ0FBQzs2QkFDUjt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7b0JBQ0YsSUFBSSxFQUFFLENBQUM7aUJBQ1I7cUJBQU07b0JBQ0wsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtRQUNILENBQUM7UUFDRCxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN0QyxPQUFPLEtBQUssQ0FBQyxPQUFRLEVBQUUsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGFsbG93UmVmLCBvbk1vdW50ZWQsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCBjb25zdCBEZWZlclJlbmRlcmluZyA9IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdkZWZlci1yZW5kZXJpbmcnLFxuICBwcm9wczoge1xuICAgIGZyYW1lczoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIHNldHVwKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjdXJyZW50RnJhbWUgPSBzaGFsbG93UmVmKDApO1xuICAgIGZ1bmN0aW9uIGNoZWNrUmVuZGVyaW5nU3RhdHVzKCkge1xuICAgICAgaWYgKHByb3BzLmZyYW1lcyA+IDApIHtcbiAgICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgICAgY29uc3Qgc3RlcCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW50RnJhbWUudmFsdWUgPCBwcm9wcy5mcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RnJhbWUudmFsdWUrKztcbiAgICAgICAgICAgICAgICBzdGVwKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgc3RlcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gKGN1cnJlbnRGcmFtZS52YWx1ZSA9IHByb3BzLmZyYW1lcyksIHByb3BzLmZyYW1lcyAqIDE2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbk1vdW50ZWQoY2hlY2tSZW5kZXJpbmdTdGF0dXMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY3VycmVudEZyYW1lLnZhbHVlID49IHByb3BzLmZyYW1lcykge1xuICAgICAgICByZXR1cm4gc2xvdHMuZGVmYXVsdCEoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSk7XG4iXX0=